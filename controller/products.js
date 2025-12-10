import ProductModel from "../models/productModel.js"

const products = (req, res) => {
    ProductModel.find()
        .then(data => {
            res.status(200)
            res.json(data)
        })
        .catch(err => {
            res.status(500)
            res.json("Internal Server Error")
        })
}

const createProducts = async (req, res) => {
    const productsData = new ProductModel(req.body)
    await productsData.save()
    res.status(200)
    res.json("Success")
}

const getProductsById = async (req, res) => {
    const id = req.params.id
    const product = await ProductModel.find({ _id: id })
    res.status(200)
    res.json(product)
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    await ProductModel.deleteOne({ _id: id })
    res.status(200)
    res.json("Deleted Successfully")
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { brand, model, price, inStock, category } = req.body
    await ProductModel.findOneAndUpdate({_id: id}, { brand, model, price, inStock, category})
    res.status(200)
    res.json("Updated Successfully")
}

export default { products, createProducts, getProductsById, deleteProduct, updateProduct }