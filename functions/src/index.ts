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
import { logger } from "firebase-functions";
import * as express from "express";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

interface sampleData {
  text: string;
}

interface testPayload {
    cartSize: number;
    cartSubtotal: string;
}

//typing request and response in onCall 
exports.testresponse = onCall<testPayload,sampleData>(
  (req: CallableRequest) => { 
    const cartInformation = req.data;
    const cartSize = cartInformation.cartSize;
    const cartTotal = cartInformation.cartSubtotal;
    const responseMessage = `cartsize ${cartSize} and cartTotal ${cartTotal}`
    console.log(responseMessage)
    logger.info(responseMessage)
    return {
      text: responseMessage,
    };
  }
);

//only typing request 
exports.testresponsealt = onCall(
  (req: CallableRequest<testPayload>) => {
    const cartInformation = req.data;
    const cartSize = cartInformation.cartSize;
    const cartTotal = cartInformation.cartSubtotal;
    const responseMessage = `cartsize ${cartSize} and cartTotal ${cartTotal}`
    console.log(responseMessage)
    logger.info(responseMessage)
    return {
      text: responseMessage,
    };
  }
);

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
