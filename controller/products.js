import Products from "../repositories/product.js"
import Reviews from "../repositories/reviewRepo.js";

const products = async (req, res) => {
    try {
        const page = +req.params.page || 1;
        const pageSize = +req.params.pageSize || 10
        const {sortBy, dir, search} = req.query
        const options = {page, pageSize, sortBy, dir, search}
        const data = await Products.getProduct(options)
        const totalRecords = await Products.getProductCount(options);

        // console.log("PRODUCTS", data, data.toJSON())
        const totalPages = Math.ceil(totalRecords / pageSize)
    
        const response = {
            totalRecords,
            totalPages,
            data
        }
        res.status(200)
        res.json(response)
    } catch (error) {
        res.status(500)
        res.send(error)        
    }
        
}

const createProducts = async (req, res) => {
    console.log('create....', req.body, req.file);
    try {
        req.body.createdAt = new Date()
        await Products.createProducts(req.body)
        res.status(200)
        res.json("Success")
    } catch (error) {
        res.status(500)
        res.send(error)
    }
}

const getProductsById = async (req, res) => {
    const product = await Products.getProductsById(req.params.id)
    const reviews = await Reviews.getReviewById(req.params.id)
    const avgRating = await Reviews.getAvgRating(req.params.id)
    const response = {
        product,
        reviews,
        avgRating
    }
    console.log("!!", reviews, product)
    res.status(200)
    res.json({response}) 
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