const validate = require('../middleware/validate')
const schemas = require('../validations/Movie')

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

router.get('/', movieController.getAllMovies);
router.get('/top10', movieController.getTop10Movies)
router.get('/:movie_id', movieController.getMovieById)
router.route("/").post(validate(schemas.createValidation), movieController.sendMovie)
router.get('/between/:start_year/:end_year', movieController.betweenMovie)
router.route("/:movie_id").put(validate(schemas.updateValidation), movieController.putMovie)
router.delete('/:movie_id', movieController.deleteMovie)

module.exports = router;
