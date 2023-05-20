const postLogin = require("./login.js")
const postRegister = require("./signup.js");
const updateUserPhoto = require("./updateUserPhoto.js")
const getUserById = require("./getUserById")
const GetAppliedEvents = require("./GetAppliedEvents.js")

module.exports = {
    postLogin,
    postRegister,
    updateUserPhoto,
    getUserById,
    GetAppliedEvents
}