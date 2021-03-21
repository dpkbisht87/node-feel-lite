const winston = require('winston');
require('winston-mongodb');
const express = require('express');
require('express-async-errors');
const app = express();

require('./startup/logging')()
require('./startup/routes')(app);
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3001
app.listen(port, () => winston.info(`Listening on port ${port}`)
)