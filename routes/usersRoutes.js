import express from "express";
const router = express.Router()
import userCtrl from "../controller/userCtrl.js";

router.post('/register', userCtrl.createUsers);
router.post('/login', userCtrl.getUser)

export default router;