const Movie = require('../models/Movie')

const insert = (data) => {
    const movie = new Movie(data)
    return movie.save()
}

const findAll = () => {
    return Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: '$director'
        }
    ]);
}

const findTop10Movies = () => {
    return Movie.find({}).limit(10).sort({ imdb_score: -1 })
}

const findById = (data) => {
    return Movie.findById(data);
}

const findBetweenMovie = ({ start_year, end_year }) => {
    return Movie.find({
        year: { "$gte": parseInt(start_year), '$lte': parseInt(end_year) }
    })
}

const update = ({ movie_id, data }) => {
    return Movie.findByIdAndUpdate(
        movie_id,
        data,
        { new: true }
    );
}

const remove = (data) => {
    return Movie.findByIdAndRemove(data);
}

module.exports = {
    insert,
    findAll,
    findTop10Movies,
    findById,
    findBetweenMovie,
    update,
    remove
}