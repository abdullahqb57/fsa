import express from "express";
const router = express.Router();

import productsCtrl from "../controller/products.js";

router.get("/", productsCtrl.products)
router.post("/", productsCtrl.createProducts)
router.get("/:id", productsCtrl.getProductsById)
router.delete("/:id", productsCtrl.deleteProduct)
router.put("/:id", productsCtrl.updateProduct)

export default router;