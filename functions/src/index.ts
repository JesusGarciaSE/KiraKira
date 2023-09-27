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
const stripe = require("stripe");
// Start writing functions`
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const firestore = getFirestore();

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
