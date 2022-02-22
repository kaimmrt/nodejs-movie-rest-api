const httpStatus = require('http-status')
const { passwordToHash, generateRefreshToken, generateAccessToken } = require('../scripts/utils/helper')
const { insert, loginUser, updatePassword } = require('../services/Auth');
const uuid = require("uuid")
const eventEmitter = require('../scripts/events/eventEmitter')

exports.getHomePage = async (req, res, next) => {
    res.render('index', { title: 'Express' });
}

exports.register = async (req, res) => {
    req.body.password = passwordToHash(req.body.password)

    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.login = async (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    loginUser(req.body)
        .then((user) => {
            if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "User not found." })

            user = {
                ...user.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
            }
            delete user.password
            res.status(httpStatus.OK).send(user)
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.resetPassword = async (req, res) => {
    const newPassword = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    updatePassword({ email: req.body.email }, { password: passwordToHash(newPassword) })
        .then((updatedUser) => {
            if (!updatePassword)
                res.status(httpStatus.NOT_FOUND).send({ message: "User not found!" })
            eventEmitter.emit("send_email", {
                to: updatedUser.email,
                subject: "Reset Password",
                html: `Your password reset has been successfully completed. <br/> <br/> Yeni şifreniz : <b>${newPassword}</b>`
            })
            res.status(httpStatus.OK).send({ message: "transaction successful" })

        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}
