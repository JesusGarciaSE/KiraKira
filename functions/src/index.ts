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

exports.testresponse = onCall((req: CallableRequest) => {});

exports.helloworld = onRequest(
  (request: express.Request, response: express.Response): void | Promise<void> => {
    
    logger.info("test", request);
    logger.info("Hello logs!", { structuredData: true });
    response.json({ data: "hello world" });
  }
);
