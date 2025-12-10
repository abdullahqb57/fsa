import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express()

import config from "./config/index.js";
import products from "./routes/products.js"

app.use(bodyParser.json());
app.use("/api/products", products)

app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`)
})

mongoose.connect(config.dbConStr).then(res => {
    console.log(`Successfully connected ${res}`)
})
.catch(err => console.log(`Mongo DB ERR ${err}`))