import User from "../models/user.js";

const userService = {
    getAll() {
        return User.find();
    },
    getOne(userId) {
        return User.findById(userId);
    },
    updateProfileImage: async (userId, profileImage) => {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        
        user.profileImage = profileImage;
        
        await user.save();
        
        return user;
    }
};

export default userService;
