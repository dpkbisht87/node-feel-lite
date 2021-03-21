const mongoose = require('mongoose')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const reactionSchema = new mongoose.Schema({
    like: {
        type: Number,
        default: 0
    },
    hug: {
        type: Number,
        default: 0
    },
    smile: {
        type: Number,
        default: 0
    },
    sad: {
        type: Number,
        default: 0
    },
    rofl: {
        type: Number,
        default: 0
    }
})

const storySchema = new mongoose.Schema({
    content: String,
    name: {
        type: String,
        default: 'AnonymousUser'
    },
    email: {
        type: String,
        default: 'AnonymousEmail'
    },
    isAnonymous: Boolean,
    date: { type: Date, default: Date.now },
    reaction: reactionSchema
})

const Reaction = mongoose.model('Reaction', reactionSchema)
const Story = mongoose.model('Story', storySchema);

function validateStory(story) {
    const schema = Joi.object({
        content: Joi.string().min(5).required(),
        userId: Joi.objectId().required(),
        isAnonymous: Joi.boolean()
    })
    return schema.validate(story)
}

function validateReactionType(reaction) {
    console.log('Validate Reaction');
    const schema = Joi.object({
        reaction: Joi.string()
            .valid('like', 'hug', 'sad', 'smile', 'rofl')
            .required()
    })
    return schema.validate(reaction)
}

exports.Story = Story;
exports.Reaction = Reaction;
exports.validateStory = validateStory;
exports.validateReaction = validateReactionType;
