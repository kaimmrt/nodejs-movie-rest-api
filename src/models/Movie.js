const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const logger = require('../scripts/logger/Movie')

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,

}, { timestamps: true, versionKey: false })

MovieSchema.post("save", (doc) => {
    logger.log({
        level: "info",
        message: doc
    })
})

module.exports = mongoose.model('movie', MovieSchema)