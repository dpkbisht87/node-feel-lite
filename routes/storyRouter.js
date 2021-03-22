const auth = require('../middleware/auth')
const express = require('express')
const { Story, Reaction, validateStory, validateReaction } = require('../model/story');
const { User } = require('../model/user');

const storyRouter = express.Router()

storyRouter.get('/', async (req, res) => {
    const stories = await Story
        .find()
        .populate('user', 'name -_id')
        .select('user content reaction ')
        .sort('date')
    res.send(stories);
})

//POST NEW STORY
storyRouter.post('/', auth, async (req, res) => {
    const { error } = validateStory(req.body);
    if (error) return res.status(400).send(error.message);


    const user = await User.findById(req.body.userId)
    if (!user) return res.status(404).send('User does not exist');

    if (req.body.isAnonymous) {
        username = null;
        email = null;
    } else {
        username = user.name;
        email = user.email;
    }
    console.log('Username :' + username)
    console.log('email :' + email)
    let story = new Story({
        content: req.body.content,
        name: username,
        email: username,
        reaction: new Reaction()
    })
    story = await story.save();
    await user.updateOne({ $push: { stories: story._id } })
    res.send(story);
})

//UPDATE EXISTING STORY
storyRouter.put('/:id', auth, async (req, res) => {
    const { error } = validateStory(req.body);
    if (error) return res.status(400).send(error.message);

    const update = { content: req.body.content }
    let story = await Story.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!story) res.status(404).send('The story with the given Id does not exist')
    res.send(story.content)
})

//INCREMENT STORY REACTION
storyRouter.put('/reaction/:id', auth, async (req, res) => {
    const { error } = validateReaction(req.body);
    if (error) return res.status(400).send(error.message);

    const update = { $inc: { "reaction.sad": 1 } }
    let story = await Story.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!story) res.status(404).send('The story with the given Id does not exist')
    res.send(story.content)

})

//DELETE STORY
storyRouter.delete('/:id', auth, async (req, res) => {
    let story = await Story.deleteOne({ _id: req.params.id });
    if (!story) return res.status(404).send('Story does not exist.')

    // Delete story entry from user document too

    res.send(story)
})

module.exports = storyRouter;