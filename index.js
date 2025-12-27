import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import bunyan from "bunyan";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import auth from "./utils/auth.js";

// recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

import config from "./config/index.js";
import products from "./routes/products.js"
import reviews from "./routes/reviewRoutes.js"
import users from "./routes/usersRoutes.js"

// ensure logs folder exists
if (!fs.existsSync(path.join(__dirname, "logs"))) {
  fs.mkdirSync(path.join(__dirname, "logs"));
}

const fileStream = fs.createWriteStream(path.join(__dirname, 'logs', 'request.log'), { flags: 'a' });

app.use(morgan('tiny'));
app.use(morgan('combined', { stream: fileStream }));

app.use(bodyParser.json());

app.use(express.static('uploads/'))

app.use("/api/users", users);


app.use(auth.verifyAuth)
// app.use(auth.basicAuth)
app.use("/api/products", products);
app.use("/api/reviews", reviews);


app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`)
})

const logger = bunyan.createLogger({name: "FSA"});

logger.info('App has started running...')

mongoose.connect(config.dbConStr).then(res => {
    console.log(`Successfully connected ${res}`)
})
.catch(err => console.log(`Mongo DB ERR ${err}`))