const validate = require('../middleware/validate')
const schemas = require('../validations/User')

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.route("/update-profile-image").post(userController.updateProfileImage)

module.exports = router;

