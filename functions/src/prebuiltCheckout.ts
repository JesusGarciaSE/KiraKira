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
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";
import {
  ICartItem,
  IOrderData,
  IOrderRequest,
  IStripeItem,
  IUser,
} from "./Models/ItemModels";
const stripe = require("stripe")(process.env.SECRET_API_KEY);
admin.initializeApp();
const firestore = getFirestore();
const { FieldValue } = require("firebase-admin/firestore");

const KIRAKIRA_DOMAIN = "http://localhost:5173";
const endpointSecret = process.env.WHSEC;

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
    ch_session_id: session.id,
    ...(requestUserId && { user_id: requestUserId }),
  };
  const orderRef = await createOrder(orderData);
  logger.log("userId", requestUserId);
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

  let order = {
    ...orderData,
    order_id: orderId,
  };

  logger.log("updating user", userId, "with order", order);
  userDoc.update({
    orders: FieldValue.arrayUnion(order),
  });
};

exports.stripewebhooks = onRequest((request, response) => {
  const payload = request.rawBody;
  const requestSignatures = request.headers["stripe-signature"];
  let stripePayload;
  try {
    stripePayload = stripe.webhooks.constructEvent(
      payload,
      requestSignatures,
      endpointSecret
    );
  } catch (err) {
    logger.log("Error with request", err);
    response.status(400).send(`webhook error ${err}`);
  }

  switch (stripePayload.type) {
    case "charge.succeeded":
      updateOrder(stripePayload.data.object.id);
      break;
    case "checkout.session.completed":
      updateOrder(stripePayload.data.object.id);
      break;
    default:
      // Unexpected event type
      logger.log(`Unhandled event type ${stripePayload.type}.`);
  }
  response.status(200).end();
});

const updateOrder = async (checkoutId: string) => {
  const orderDoc = await firestore
    .collection("Orders")
    .where("ch_session_id", "==", checkoutId)
    .limit(1)
    .get();
  orderDoc.forEach((doc) => {
    doc.ref.update({ paymentStatus: true });
  });
};

exports.updateUserOrder = onDocumentUpdated(
  "Orders/{OrderId}",
  async (event) => {
    const updatedOrder = event.data?.after.data() as IOrderData;

    if (updatedOrder.user_id) {
      const userDocRef = firestore
        .collection("Users")
        .doc(updatedOrder.user_id);
      const userDoc = await userDocRef.get();
      if (!userDoc.exists) return;
      const user = userDoc.data() as IUser;
      const oldOrder = user.orders.filter(
        (order) => order.ch_session_id === updatedOrder.ch_session_id
      )[0];
      updatedOrder.order_id = oldOrder.order_id
      userDocRef.update({
        orders: FieldValue.arrayRemove(oldOrder),
      });
      userDocRef.update({
        orders: FieldValue.arrayUnion(updatedOrder),
      });
    }
  }
);
