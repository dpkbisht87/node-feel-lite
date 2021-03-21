const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const { User, validate } = require('../model/user');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find().select('-password');
    res.send(users);
});

userRouter.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user).select('-stories -password');
    res.send(user);
})

// CREATE NEW USER
userRouter.post('/', async (req, res) => {
    console.log('Name: ' + req.body.name)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered.')
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save();
    const token = user.generateAuthToken()
    console.log('Auth token: ' + token)
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
})

// UPDATE USER DETAILS
userRouter.put('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.message);
    const filter = { email: req.body.email }
    console.log(req.body.email)
    const update = { name: req.body.name }
    let user = await User.findOneAndUpdate(filter, update, { new: true })
    if (!user) res.status(404).send('The user with given email does not exist')
    console.log(user.name)
    res.send(user);
})

// DELETE USER
userRouter.delete('/', async (req, res) => {
    const filter = { email: req.body.email }
    const user = await User.findOneAndRemove(filter);
    if (!user) return res.status(400).send('Given Id is not valid. Failed to Delete');
    res.send(user);
})

module.exports = userRouter;