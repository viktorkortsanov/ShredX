import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.get('/users', async (req, res) => {
    const users = await userService.getAll().lean();
    res.json(users);
});

userController.get('/users/:userId', async(req,res) => {
    const userId = req.params.userId;
    const userInfo = await userService.getOne(userId).lean();
    res.json(userInfo);
});


export default userController;