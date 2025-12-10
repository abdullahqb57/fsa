import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    brand: String,
    model: String,
    price: Number,
    inStock: Boolean,
    category: String,
    
})

export default mongoose.model('product', productSchema)