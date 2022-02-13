const validate = require('../middleware/validate')
const schemas = require('../validations/User')

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.get("/", authController.getHomePage)
router.route("/register").post(validate(schemas.createValidation), authController.register)
router.route("/login").post(validate(schemas.loginValidation), authController.login)
router.route("/reset-password").put(validate(schemas.resetPasswordValidation), authController.resetPassword)

module.exports = router;

