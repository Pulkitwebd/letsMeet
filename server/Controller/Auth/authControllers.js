const postLogin = require("./login.js")
const postRegister = require("./signup.js");
const updateUser = require("./updateUser")
const getUserById = require("./getUserById")

module.exports = {
    postLogin,
    postRegister,
    updateUser,
    getUserById
}