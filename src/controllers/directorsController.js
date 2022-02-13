const { insert, findAll, findById, update, remove } = require('../services/Director')
const httpStatus = require('http-status')

exports.postDirector = async (req, res) => {
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.getAllDirector = async (req, res) => {
    findAll()
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.getDirectorById = async (req, res) => {
    if (!req.params.director_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id information is missing."
        })
    }
    findById(req.params)
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.putDirector = async (req, res) => {
    if (!req.params.director_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id information is missing."
        })
    }
    update({ director_id: req.params.director_id, data: req.body })
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.deleteDirector = async (req, res) => {
    if (!req.params.director_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id information is missing."
        })
    }
    remove(req.params.director_id)
        .then((response) => {
            res.status(httpStatus.OK).send(response)
            console.log(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
            console.log(e)
        })
}