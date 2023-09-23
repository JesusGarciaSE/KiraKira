/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {
  CallableRequest,
  onCall,
  onRequest,
} from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";
import * as express from "express";
import { getFirestore } from "firebase-admin/firestore";
import admin = require("firebase-admin");

// Start writing functions`
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const firestore = getFirestore();
interface sampleData {
  text: string;
}

interface testPayload {
  cartSize: number;
  cartSubtotal: string;
}

interface IOrder {
  [id: string]: number;
}

exports.getTotalCost = onDocumentCreated("/Orders/{orderId}", async (event) => {
  console.log("order created fired");
  const snapshot = event.data;
  if (!snapshot) {
    console.log("no event found");
    return;
  }
  const data = snapshot.data();
  console.log("Data created at Orders/{orderId}", data);
  const total = await getProductCosts(snapshot.data(), snapshot.id);
  console.log("total cost", total);
  await updateOrderTotal(snapshot.id, total);
  return 0;
});

const getProductCosts = async (order: IOrder, orderID: string) => {
  let keys = Object.keys(order);
  let total = 0.0;
  console.log(`received order ${JSON.stringify(order)} for orderID ${orderID}`);
  let key = keys[0];
  console.log("key[0]", key);
  for (key of keys) {
    await firestore
      .collection("Products")
      .where("id", "==", key)
      .get()
      .then((documents) => {
        documents.forEach((doc) => {
          console.log(
            `document for key ${key} is ${JSON.stringify(doc.data())}`
          );
          let product = doc.data();
          total +=
            (product.onSale
              ? Number.parseFloat(product.salePrice)
              : Number.parseFloat(product.price)) * order[key];
        });
      });
  }
  console.log("total", total);
  return total.toFixed(2);
};

const updateOrderTotal = async (docID: string, orderTotal: string) => {
  const orderRef = firestore.collection("Orders").doc(docID);
  await orderRef.update({ total: orderTotal });
};

//typing request and response in onCall
exports.testresponse = onCall<testPayload, sampleData>(
  (req: CallableRequest) => {
    const cartInformation = req.data;
    const cartSize = cartInformation.cartSize;
    const cartTotal = cartInformation.cartSubtotal;
    const responseMessage = `cartsize ${cartSize} and cartTotal ${cartTotal}`;
    console.log(responseMessage);
    logger.info(responseMessage);
    return {
      text: responseMessage,
    };
  }
);

//only typing request
exports.testresponsealt = onCall((req: CallableRequest<testPayload>) => {
  const cartInformation = req.data;
  const cartSize = cartInformation.cartSize;
  const cartTotal = cartInformation.cartSubtotal;
  const responseMessage = `cartsize ${cartSize} and cartTotal ${cartTotal}`;
  console.log(responseMessage);
  logger.info(responseMessage);
  return {
    text: responseMessage,
  };
});

exports.helloworld = onRequest(
  (
    request: express.Request,
    response: express.Response
  ): void | Promise<void> => {
    logger.warn("Hello logs!");
    response.json({ data: { text: "hello world" } });
  }
);

exports.helloworldtwo = onRequest((request, response) => {
  logger.error("Hello logs!");
  response.json({ data: { text: "hello world two" } });
});
