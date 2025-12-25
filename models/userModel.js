import mongoose from "mongoose";

const usersModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: { type: String, default: 'User' },
    createdAt: { type: Date },
    updatedAt: { type: Date, default: new Date },
})

export default mongoose.model('users', usersModel)