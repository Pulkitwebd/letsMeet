const express = require("express");
const router = express.Router();
const authController = require("../Controller/Auth/authControllers");
const Joi = require("joi");
const auth = require("../middleware/auth.js");
const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().label("Password"),
  confirmPassword: Joi.any()
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  age: Joi.number().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
});

const updateSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().label("Password"),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  age: Joi.number().integer().min(18).max(99),
  phone: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/),
});


router.post(
  "/register",
  validator.body(registerSchema),
  authController.postRegister
);

router.post("/login", validator.body(loginSchema), authController.postLogin);

router.put("/updatePhoto", auth, authController.updateUserPhoto )

router.put("/updateUser/:user_id", validator.body(updateSchema), authController.updateUser)

router.get("/getUserById/:user_id", authController.getUserById )

router.get("/userInfoWithEvents/:user_id", authController.userInfoWithEvents )

router.get("/test", auth, (req, res) => {
  res.send("Request Passed");
});

module.exports = router;
