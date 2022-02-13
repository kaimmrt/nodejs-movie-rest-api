const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/user/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/user/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/user/combined.log' }),
    ],
});

module.exports = logger;