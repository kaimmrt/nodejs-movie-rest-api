const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const logger = require('../scripts/logger/Director')

const DirectorSchema = new Schema({
    name: String,
    surname: String,
    bio: String

}, { timestamps: true, versionKey: false })

DirectorSchema.post("save", (doc) => {
    logger.log({
        level: "info",
        message: doc
    })
})

module.exports = mongoose.model('director', DirectorSchema)