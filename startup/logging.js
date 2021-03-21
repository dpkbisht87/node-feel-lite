const config = require('config');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'unhandledExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })

    winston.add(new winston.transports.File({ filename: 'logfile.log', level: "error" }));
    winston.add(new winston.transports.MongoDB({
        db: config.get('db'),
        level: 'error'
    }));
}