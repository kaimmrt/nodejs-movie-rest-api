const User = require('../models/User')

const insert = (data) => {
    const users = new User(data)
    return users.save()
}

const loginUser = (loginData) => {
    return User.findOne(loginData)
}

const updatePassword = (where, data) => {
    return User.findOneAndUpdate(where, data, { new: true })
}

module.exports = {
    insert,
    loginUser,
    updatePassword
}