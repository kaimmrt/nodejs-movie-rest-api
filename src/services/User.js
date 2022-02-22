const User = require('../models/User')

const modify = (where, data) => {
    return User.findOneAndUpdate(where, data, { new: true })
}

module.exports = {
    modify
}