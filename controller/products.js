import ProductModel from "../models/productModel.js"
import Products from "../repositories/product.js"

const products = async (req, res) => {
    try {
        const productsRes = await Products.getProduct()
        res.status(200)
        res.json(productsRes)
    } catch (error) {
        res.status(500)
        res.json("Internal Server Error")        
    }
        
}

const createProducts = async (req, res) => {
    await Products.createProducts(req.body)
    res.status(200)
    res.json("Success")
}

const getProductsById = async (req, res) => {
    const product = await Products.getProductsById(req.params.id)
    res.status(200)
    res.json(product)
}

const deleteProduct = async (req, res) => {
    await Products.deleteProduct(req.params.id)
    res.status(200)
    res.json("Deleted Successfully")
}

const updateProduct = async (req, res) => {
    await Products.updateProduct(req.params.id, req.body)
    res.status(200)
    res.json("Updated Successfully")
}

export default { products, createProducts, getProductsById, deleteProduct, updateProduct }