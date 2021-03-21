const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/feel-lite', { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => winston.info('connected to database'))
}