import express from "express";
import auth from "../utils/auth.js";
const router = express.Router();


import productsCtrl from "../controller/products.js";

router.get("/page/:page/pageSize/:pageSize", productsCtrl.products)
router.get("/", productsCtrl.products)
router.post("/", productsCtrl.createProducts)
router.get("/:id", productsCtrl.getProductsById)
router.delete("/:id", productsCtrl.deleteProduct)
router.put("/:id", auth.isAdmin, productsCtrl.updateProduct)

export default router;