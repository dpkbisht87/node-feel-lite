const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    stories: {
        type: Array,
        default: []
    },
    password: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))

}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
        password: passwordComplexity()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;