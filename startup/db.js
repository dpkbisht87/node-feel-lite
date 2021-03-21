const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    mongoose.connect(config.get('db'), { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => winston.info('connected to database'))
}