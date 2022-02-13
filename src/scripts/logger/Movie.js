const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'movie-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/movie/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/movie/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/movie/combined.log' }),
    ],
});

module.exports = logger;