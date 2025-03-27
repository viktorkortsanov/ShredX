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

userController.put('/users/:userId/updateProfileImage', async (req, res) => {
    const { userId } = req.params;
    const { profileImage } = req.body;

    try {
        const updatedUser = await userService.updateProfileImage(userId, profileImage);
        
        res.status(200).json({
            message: 'Профилната снимка е обновена успешно!',
            profileImage: updatedUser.profileImage,
        });
    } catch (error) {
        res.status(500).json({ message: 'Грешка при обновяване на профилната снимка.' });
    }
});


export default userController;