import { Router } from 'express';
import User from '../models/user.js';
import Program from '../models/program.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

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
        return res.status(200).json({ message: 'Payment successful' });
    } catch (err) {
        console.error('Error during payment processing:', err);
        return res.status(500).json({ message: 'Error processing payment' });
    }
});

programController.get('/programs/:userId/purchased', isAdmin, async (req, res) => {
    const userId = req.params.userId;

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

// Program CRUD

programController.post('/programs/create', isAdmin, async (req, res) => {
    try {
        const program = await Program.create(req.body);
        return res.status(201).json(program);
    } catch (err) {
        console.error('Error creating program:', err);
        return res.status(500).json({ message: 'Error creating program', error: err.message });
    }
});

programController.get('/programs/all', async (req, res) => {
    try {
        const programs = await Program.find({});
        return res.status(200).json(programs);
    } catch (err) {
        console.error('Error fetching programs:', err);
        return res.status(500).json({ message: 'Error fetching programs', error: err.message });
    }
});

programController.get('/programs/single/:id', async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        return res.status(200).json(program);
    } catch (err) {
        console.error('Error fetching program:', err);
        return res.status(500).json({ message: 'Error fetching program', error: err.message });
    }
});

programController.put('/programs/update/:id', async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        return res.status(200).json(program);
    } catch (err) {
        console.error('Error updating program:', err);
        return res.status(500).json({ message: 'Error updating program', error: err.message });
    }
});

programController.delete('/programs/delete/:id', async (req, res) => {
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        return res.status(200).json({ message: 'Program deleted successfully' });
    } catch (err) {
        console.error('Error deleting program:', err);
        return res.status(500).json({ message: 'Error deleting program', error: err.message });
    }
});

export default programController;
