import User from "../models/user.js"

const userService = {
    getAll() {
        return User.find();
    },
}

export default userService;