import { Router } from "express";
import authController from "./controllers/authController.js";
import postController from "./controllers/postController.js";

const routes = Router();

routes.use(authController);
routes.use(postController);
export default routes