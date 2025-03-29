import { Router } from "express";
import userService from "../services/userService.js";
import User from "../models/user.js";

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

userController.put('/users/:userId/updateProfileImage', async (req, res) => {
    const { userId } = req.params;
    const { profileImageUrl } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImage: profileImageUrl },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


userController.get('/users/:userId/profileImage', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userService.getOne(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ profileImage: user.profileImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
export default userController;