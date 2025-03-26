import User from "../models/user.js";

const userService = {
    getAll() {
        return User.find();
    },
    getOne(userId) {
        return User.findById(userId);
    }
};

export default userService;
