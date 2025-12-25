import jwt from "jsonwebtoken";
import usersRepo from "../repositories/usersRepo.js";
import crypt from "../utils/crypt.js";
import auth from "../utils/auth.js";
const createUsers = async (req, res) => {
    try{
        const data = req.body
        data.createdAt = new Date()
        data.password = await crypt.getHash(data.password)
        await usersRepo.createUsers(data)
        res.status(201)
        res.send("Success")
    } catch(err) {
        res.status(500)
        res.send(err)
    }
}

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const data = await usersRepo.getUser(email);
        console.log("111", data, email);
        if(data) {
            const resp = await crypt.comparePasswords(password, data.password)
            if(resp) {
                const token = auth.generateAuthToken({email, role: data.role })
                res.status(200)
               return res.json({email, token, fName: data.firstName, lName: data.lastName})
            } else {
                res.status(401)
              return  res.send('Wrong Password or user')
            }
        } else {
            res.status(400)
           return res.send("Wrong Email or Passphrase")
        }
    } catch(err) {
        res.status(400)
        res.send(err)
    }
}

export default { createUsers, getUser }