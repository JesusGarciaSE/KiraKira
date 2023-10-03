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
import {
  ICartItem,
  IOrderData,
  IOrderRequest,
  IStripeItem,
} from "./Models/ItemModels";
const stripe = require("stripe")(process.env.SECRET_API_KEY);
admin.initializeApp();
const firestore = getFirestore();
const bodyParser = require("body-parser");
const { FieldValue } = require("firebase-admin/firestore");

const KIRAKIRA_DOMAIN = "http://localhost:5173";

exports.getCheckoutSession = onCall<IOrderRequest>(async (request) => {
  const requestItems = request.data.items;
  const requestUserId = request.data.userId;
  logger.log("received request", request.data);
  const items = await getItems(requestItems);
  logger.log("items: ", items);

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: "payment",
    success_url: `${KIRAKIRA_DOMAIN}/checkout/success`,
    cancel_url: `${KIRAKIRA_DOMAIN}/checkout/failed`,
  });

  const orderData: IOrderData = {
    items: request.data.items,
    paymentStatus: false,
    fulfillmentStatus: false,
    created: Date.now(),
    total: session.amount_total,
    subtotal: session.amount_subtotal,
  };
  const orderRef = await createOrder(orderData);
  console.log("userId", requestUserId);
  requestUserId && updateUser(requestUserId, orderRef.id, orderData);
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

const createOrder = async (orderData: IOrderData) => {
  const orderRef = await firestore.collection("Orders").add({
    ...orderData,
  });
  return orderRef;
};

const updateUser = async (
  userId: string,
  orderId: string,
  orderData: IOrderData
) => {
  const userDoc = await firestore.collection("Users").doc(userId);
  if (!userDoc) return;

  const { items, ...userOrderData } = orderData;
  let order = {
    ...userOrderData,
    orderId: orderId,
  };

  logger.log("updating user", userId, "with order", order);
  userDoc.update({
    orders: FieldValue.arrayUnion(order),
  });
};

exports.stripewebhooks = onRequest((request, response) => {
  const payload = bodyParser(request.body);
  logger.log("webhook triggered");
  console.log(payload);
  console.log("webhook triggered");
  response.status(200).send("webhook triggered");
});