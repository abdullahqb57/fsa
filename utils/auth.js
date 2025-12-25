import jwt from "jsonwebtoken"
// import cofig from "../config"

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(authHeader) {
    const token = authHeader.split(' ') // basic hjgjgjgjhjh
    const buff = new Buffer(token[1], 'base64')
    const decodedStr = buff.toString('utf-8')
    const credentials = decodedStr.split(':')
    if(credentials[0] === 'admin' && credentials[1] === 'password') {
        next()
    } else {
        res.status(401)
        res.send("Unauthorized")
    }
  } else {
        res.status(401)
        res.send("Unauthorized")
  }
}

const generateAuthToken = (payload) => {
  return jwt.sign(payload, 'secret', {expiresIn: '1d'})
}

const verifyAuth = (req, res, next) => {
  console.log(req.headers.authorization)
  const auth = req.headers.authorization
  if (!auth) {
    res.status(400)
    res.send("Session Expired")
  } else {
    const token = auth.split(" ")
    const isVerified = jwt.verify(token[1], "secret")
    console.log("~~~", isVerified)
    if (isVerified) {
      req.role = isVerified.role
      next()
    } else {
      res.status(400)
      res.send('Unauthorized')
    }
  }
}

const isAdmin = (req, res, next) => {
  console.log('isAdmin', req)
  if(req.role === 'admin') {
    next()
  } else {
    res.status(404)
    res.send('Unauthorised')
  }
}

export default { basicAuth, generateAuthToken, verifyAuth, isAdmin }