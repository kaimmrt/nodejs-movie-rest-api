const mongoose = require('mongoose')
const Director = require('../models/Director')

const insert = (data) => {
    const director = new Director(data)
    return director.save()
}

const findAll = () => {
    return directors = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ])
}

const findById = (data) => {
    return Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(data.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ])
}

const update = ({ director_id, data }) => {
    return Director.findByIdAndUpdate(
        director_id,
        data,
        { new: true }
    );
}

const remove = (data) => {
    return Director.findByIdAndRemove(data);
}

module.exports = {
    insert,
    findAll,
    findById,
    update,
    remove
}