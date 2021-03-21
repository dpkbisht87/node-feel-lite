const express = require('express');
const userRouter = require('../routes/userRouter');
const storyRouter = require('../routes/storyRouter');
const authRouter = require('../routes/auth');
const home = require('../routes/home');
const error = require('../middleware/error');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/user', userRouter)
    app.use('/story', storyRouter)
    app.use('/auth', authRouter)
    app.use('/', home);
    app.use(error)
} 