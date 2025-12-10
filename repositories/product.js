import Product from "../models/productModel.js";

const getProduct = () => {
    return Product.find()
}

const createProducts = (data) => {
    const productsData = new Product(data)
    return productsData.save()
}

const getProductsById = (id) => {
    return Product.find({ _id: id })
}

const deleteProduct = (id) => {
    return Product.deleteOne({ _id: id })
}

const updateProduct = (id, data) => {
    const { brand, model, price, inStock, category } = data
    return Product.findOneAndUpdate({ _id: id }, { brand, model, price, inStock, category })
}

export default { getProduct, createProducts, getProductsById, deleteProduct, updateProduct }