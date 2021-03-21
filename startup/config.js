const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL: jwtPrivateKey is not defined');
    }
    if (!config.get('db')) {
        throw new Error('FATAL: mongo db connect string is not defined');
    }
};