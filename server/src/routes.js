import { Router } from "express";
import authController from "./controllers/authController.js";
import volcanoController from "./controllers/volcanoController.js";

const routes = Router();

routes.use(authController);
routes.use(volcanoController);
export default routes