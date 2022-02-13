const { insert, findAll, findTop10Movies, findById, findBetweenMovie, update, remove } = require('../services/Movie')
const httpStatus = require('http-status')

exports.getAllMovies = async (req, res) => {
    findAll()
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.getTop10Movies = async (req, res) => {
    findTop10Movies()
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.getMovieById = async (req, res) => {
    if (!req.params.movie_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id information is missing."
        })
    }
    findById(req.params.movie_id)
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.sendMovie = async (req, res) => {
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.betweenMovie = async (req, res) => {
    const { start_year, end_year } = req.params

    findBetweenMovie({ start_year, end_year })
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.putMovie = async (req, res) => {
    if (!req.params.movie_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id information is missing."
        })
    }
    update({ movie_id: req.params.movie_id, data: req.body })
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.deleteMovie = async (req, res, next) => {
    if (!req.params.movie_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id information is missing."
        })
    }
    remove(req.params.movie_id)
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}