import bcrypt from "bcrypt";

const getHash = (password) => {
    return bcrypt.hash(password, 1)
}

const comparePasswords = (plainText, hash) => {
    return bcrypt.compare(plainText, hash)
}

export default { getHash, comparePasswords }