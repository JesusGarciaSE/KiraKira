/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const express = require("express");
import { Express, Request, Response } from "express";
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const app: Express = express();
// const PORT: Number = 4040;

app.get("/", (req: Request, res: Response) => {});
exports.helloworld = onRequest((request: Request, response: Response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
