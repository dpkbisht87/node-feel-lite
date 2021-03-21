const express = require('express')
const home = express.Router()

home.get('/', (req, res) => {
    res.send('Welcome to node js application')
})

module.exports = home