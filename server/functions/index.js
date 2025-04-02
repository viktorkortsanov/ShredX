import { onRequest } from "firebase-functions/v2/https";
import app from "../src/index.js";

export const api = onRequest(app);