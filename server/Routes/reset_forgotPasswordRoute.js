const Joi = require("joi");
const express = require("express");
const router = express.Router();
const forgotPassword = require("../Controller/Auth/forgotPassword");
const resetPassword = require("../Controller/Auth/resetPassword");
const validator = require("express-joi-validation").createValidator({});

const reset_password = Joi.object({
  password: Joi.string().required().label("Password"),
  confirmPassword: Joi.any()
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const forgot_password = Joi.object({
  email: Joi.string().email().required(),
});

router.post(
  "/forgot-password",
  validator.body(forgot_password),
  forgotPassword
);

router.post("/reset-password", validator.body(reset_password), resetPassword);

module.exports = router;
