import { Router } from "express";
import authController from "./controllers/authController.js";
import postController from "./controllers/postController.js";
import userController from "./controllers/userController.js";
import programController from "./controllers/programController.js";

const routes = Router();


routes.use(programController);
routes.use(userController);
routes.use(authController);
routes.use(postController);
export default routes