import express from "express"
const router = express.Router();
import reviews from "../controller/reviewCtrl.js"

router.post("/", reviews.createReviewCtrl);

export default router