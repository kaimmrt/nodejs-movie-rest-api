const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const logger = require('../scripts/logger/User')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 5
    }
}, { timestamps: true, versionKey: false })

UserSchema.post("save", (doc) => {
    logger.log({
        level: "info",
        message: doc
    })
})

module.exports = mongoose.model('user', UserSchema)