const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'director-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/director/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/director/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/director/combined.log' }),
    ],
});

module.exports = logger;