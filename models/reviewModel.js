import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {type: Number, required: true },
    subject: { type: String },
    message: { type: String },
    updatedAt: {type: Date, default: new Date },
    createdAt: { type: Date, required: true },
    productId: { type: String, required: true  }
})

//Performance
reviewSchema.index({productId: 1})

export default mongoose.model('review', reviewSchema); 