const postLogin = require("./login.js")
const postRegister = require("./signup.js");
const updateUser = require("./updateUser")
const getUserById = require("./getUserById")
const GetAppliedEvents = require("./GetAppliedEvents.js")

module.exports = {
    postLogin,
    postRegister,
    updateUser,
    getUserById,
    GetAppliedEvents
}