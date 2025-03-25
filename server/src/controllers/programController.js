import { Router } from 'express';
import User from '../models/user.js';

const programController = Router();

programController.post('/programs/pay/:programId', async (req, res) => {
    const { programId } = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.purchasedPrograms.includes(programId)) {
            return res.status(400).json({ message: 'Program already purchased' });
        }

        user.purchasedPrograms.push(programId);
        await user.save();
        return res.status(200).json({ message: 'Payment successful'});
    } catch (err) {
        console.error('Error during payment processing:', err);
        return res.status(500).json({ message: 'Error processing payment' });
    }
});

programController.get('/programs/purchased', async (req, res) => {
    const userId = req.user?._id;

    try {
        const user = await User.findById(userId).populate('purchasedPrograms');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.purchasedPrograms);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default programController;
