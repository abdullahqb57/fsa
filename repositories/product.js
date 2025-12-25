import Product from "../models/productModel.js";

const getProduct = (options) => {
    if(!options.sortBy) {
        options.sortBy = "updatedAt"
    }
    let filter = {}
    if(options.search) {
        filter = {
            $or: [{brand: { $regex: options.search, $options: 'i'} }, {brand: { $regex: options.search, $options: 'i'}}, {category: { $regex: options.search, $options: 'i'}}]
        }
    }
    return Product.find(filter, {__v: 0})
    .sort({[options.sortBy] : options.dir.toLowerCase() === "asc" ? 1 : -1})
    .skip((options.page - 1) * options.pageSize)
    .limit(options.pageSize)
}

const getProductCount = (options) => {
    let filter = {}
    if(options.search) {
        filter = {
            $or: [{brand: { $regex: options.search, $options: 'i'} }, {brand: { $regex: options.search, $options: 'i'}}, {category: { $regex: options.search, $options: 'i'}}]
        }
    }
    return Product.countDocuments(filter)
}

const createProducts = (data) => {
    const productsData = new Product(data)
    return productsData.save()
}

const getProductsById = (id) => {
    return Product.findById({ _id: id })
}

const deleteProduct = (id) => {
    return Product.deleteOne({ _id: id })
}

const updateProduct = (id, data) => {
    const { brand, model, price, inStock, category } = data
    return Product.findOneAndUpdate({ _id: id }, { brand, model, price, inStock, category })
}

export default { getProduct, createProducts, getProductsById, deleteProduct, updateProduct, getProductCount }