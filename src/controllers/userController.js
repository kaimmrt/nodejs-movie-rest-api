const httpStatus = require('http-status');
const { modify } = require('../services/User')
const path = require("path");

exports.updateProfileImage = async (req, res) => {
    if (!req?.files?.profile_image) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "File not found" })
    }

    const extension = path.extname(req.files.profile_image.name)
    const fileName = `${req?.user_id}${extension}`

    const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
    req.files.profile_image.mv(folderPath, function (err) {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err })
        modify({ _id: req.user_id }, { profile_image: fileName })
            .then(updatedUser => {
                res.status(httpStatus.OK).send({ message: updatedUser })
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }))
    })
}
