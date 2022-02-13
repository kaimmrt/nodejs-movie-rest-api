const Joi = require('joi')

const createValidation = Joi.object({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(6),
    email: Joi.string().email().required().min(6),
})

const loginValidation = Joi.object({
    email: Joi.string().email().required().min(6),
    password: Joi.string().required().min(6),
})

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(6),
})


module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
}