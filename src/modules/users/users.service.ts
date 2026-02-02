
import User from "./users.model";

export const createUser = async (name: string, email: string, password: string) => {
    const newUser = new User({ name, email, password });
    return await newUser.save();
}

export const getUserByEmail = async (email: string) => {
    return await User.findOne({ email });
}

export const getUserById = async (userId: string) => {
    return await User.findById(userId);
}

export const getAllUsers = async () => {
    return await User.find();
}

export const deleteUserById = async (userId: string) => {
    return await User.findByIdAndDelete(userId);
}

