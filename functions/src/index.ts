/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { getFirestore } from "firebase-admin/firestore";
import admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
const stripe = require("stripe")(process.env.SECRET_API_KEY);
// Start writing functions`
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const firestore = getFirestore();

export interface ICartItem {
  name: string;
  id: string;
  image: string;
  cost: number;
  onSale: boolean;
  quantity: number;
}
interface IShoppingCart {
  orders: ICartItem[];
}

interface IStripeItem {
  price: any;
  quantity: number;
}
interface IOrderRequest {
  items: ICartItem[];
  orderId: string;
}

const KIRAKIRA_DOMAIN = "http://localhost:5173";

exports.getCheckoutSession = onCall<IShoppingCart>(async (request) => {
  logger.log("received order", request.data.orders);
  const items = await getItems(request.data.orders);
  logger.log("items: ", items);
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: "payment",
    success_url: `${KIRAKIRA_DOMAIN}/checkout/success`,
    cancel_url: `${KIRAKIRA_DOMAIN}/checkout/failed`,
  });
  return { session: session.url };
});

const getItems = async (order: ICartItem[]) => {
  let items: IStripeItem[] = [];
  for (const item of order) {
    await firestore
      .collection("Products")
      .where("id", "==", item.id)
      .get()
      .then((documents) => {
        documents.forEach((doc) => {
          let product = doc.data();
          items.push({
            price: product.onSale ? product.priceIDSale : product.priceIDDefault,
            quantity: item.quantity,
          });
        });
      });
  }
  return items;
};

exports.getClientSecret = onCall<IOrderRequest>(async (request) => {
  let items = request.data.items;
  let orderId = request.data.orderId;

  //get the total cost of all items from the database
  //this avoids any modified costs that could be received from the client
  const total = await getProductCosts(items);
  logger.log("order total", total);
  //secondary function call executes to update the original order with the total cost
  updateOrderTotal(orderId, total);

  //get the clientSecret from the stripe
  const clientSecret = await stipeClientSecret(total);
  logger.log("clientSecret", clientSecret);
  return { clientSecret: clientSecret };
});

const getProductCosts = async (order: ICartItem[]) => {
  let total = 0;
  for (const item of order) {
    await firestore
      .collection("Products")
      .where("id", "==", item.id)
      .get()
      .then((documents) => {
        documents.forEach((doc) => {
          let product = doc.data();
          total +=
            (product.onSale ? product.salePrice : product.price) *
            item.quantity;
        });
      });
  }
  return total;
};

const updateOrderTotal = (docID: string, orderTotal: number) => {
  const orderRef = firestore.collection("Orders").doc(docID);
  orderRef.update({ total: orderTotal });
};

const stipeClientSecret = async (total: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  return paymentIntent.client_secret;
};
