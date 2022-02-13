const Joi = require('joi')

const createValidation = Joi.object({
    name: Joi.string().required().min(2),
    surname: Joi.string().required().min(2),
    bio: Joi.string().required().min(10),
})

const updateValidation = Joi.object({
    name: Joi.string().required().min(2),
    surname: Joi.string().required().min(2),
    bio: Joi.string().required().min(10),
})

module.exports = {
    createValidation,
    updateValidation
}