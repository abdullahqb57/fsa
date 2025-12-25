import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    brand: {type: String, required: [true, 'Brand is required'], minLength: [3, "Min. 3 chars"], maxLength: [13, "Min. 3 chars"]},
    model: {type: String, required: [true, 'Model is required']},
    price: {type: Number, required: [true, 'Price is required']},
    inStock: {type: Boolean, default: false},
    category: {type: String, required: [true, 'Category is required']},
    discount: {type: Number, default: 0 },
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date},
    reviews: {type: Array}
})

export default mongoose.model('product', productSchema)