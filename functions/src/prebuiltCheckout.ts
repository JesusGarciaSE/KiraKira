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
import { onCall, onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
const stripe = require("stripe")(process.env.SECRET_API_KEY);
// Start writing functions`
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const firestore = getFirestore();
const bodyParser = require("body-parser");

interface ICartItem {
  name: string;
  id: string;
  image: string;
  cost: number;
  quantity: number;
}

interface IOrderRequest {
  items: ICartItem[];
  orderId: string;
}

interface IStripeItem {
  price: any;
  quantity: number;
}

const KIRAKIRA_DOMAIN = "http://localhost:5173";

exports.getCheckoutSession = onCall<IOrderRequest>(async (request) => {
  logger.log("received order", request.data.items);
  const items = await getItems(request.data.items);
  logger.log("items: ", items);

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: "payment",
    success_url: `${KIRAKIRA_DOMAIN}/checkout/success`,
    cancel_url: `${KIRAKIRA_DOMAIN}/checkout/failed`,
  });
  updateUser(
    request.data.items,
    request.data.orderId,
    session.amount_total,
    session.amount_subtotal
  );
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
            price: product.onSale
              ? product.priceIDSale
              : product.priceIDDefault,
            quantity: item.quantity,
          });
        });
      });
  }

  return items;
};

const updateUser = (
  items: ICartItem[],
  orderID: string,
  total: number,
  subtotal: number
) => {
  const orderRef = firestore.collection("Orders").doc(orderID);
  orderRef.update({ orderNo: orderID, total: total, subtotal: subtotal });
};

exports.stripewebhooks = onRequest((request, response) => {
  const payload = bodyParser(request.body);
  logger.log("webhook triggered");
  console.log(payload);
  console.log("webhook triggered");
  response.status(200).send("webhook triggered");
});
