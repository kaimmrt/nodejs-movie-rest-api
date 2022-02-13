const Joi = require('joi')

const createValidation = Joi.object({
    title: Joi.string().required().min(2),
    category: Joi.string().required().min(2),
    country: Joi.string().required().min(2),
    year: Joi.number().required().min(4),
    imdb_score: Joi.number().required().min(0).max(10),
})

const updateValidation = Joi.object({
    title: Joi.string().required().min(2),
    category: Joi.string().required().min(2),
    country: Joi.string().required().min(2),
    year: Joi.number().required().min(4),
    imdb_score: Joi.number().required().min(0).max(10),
})

module.exports = {
    createValidation,
    updateValidation
}