import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.get('/users', async (req, res) => {
    const users = await userService.getAll().lean();
    res.json(users);
});


export default userController;