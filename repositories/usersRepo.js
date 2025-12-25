import userModel from "../models/userModel.js";

const createUsers = (data) => {
    const createdData = new userModel(data);
    return createdData.save()
}

const getUser = (email) => {
    return userModel.findOne({email}, {__id: 0, createdAt: 0, updatedAt: 0}).lean()
}

export default { createUsers, getUser }