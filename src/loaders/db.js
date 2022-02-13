const mongoose = require('mongoose');

const db = mongoose.connection;

db.once("open", () => {
    console.log("Db connected...")
})

const connectDb = async () => {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connectDb
}
