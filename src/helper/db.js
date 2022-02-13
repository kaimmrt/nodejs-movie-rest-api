const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb+srv://mert:UdPBnV1OhnMV0wy9@cluster0.fbssk.mongodb.net/movie-api?retryWrites=true&w=majority')

    mongoose.connection.on('open', () => {
        // console.log("MongoDB: Connected")
    })

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB: Error", err)
    })

    mongoose.Promise = global.Promise;
}