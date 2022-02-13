const validate = require('../middleware/validate')
const schemas = require('../validations/Director')

const express = require('express')
const router = express.Router()
const directorController = require('../controllers/directorsController')

router.route("/").post(validate(schemas.createValidation), directorController.postDirector)
router.get('/', directorController.getAllDirector)
router.get('/:director_id', directorController.getDirectorById)
router.route("/:director_id").put(validate(schemas.updateValidation), directorController.putDirector)
router.delete('/:director_id', directorController.deleteDirector)

module.exports = router;