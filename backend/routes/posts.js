const express = require('express')

const router = express.Router()

const Post = require('../models/post');

router.post('', async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await post.save().then(createdPost => {
        res.status(201).json({
            message: 'post added successfully',
            postId: createdPost._id
        });
    });

});

router.put('/:id', async (req, res, next) => {
    let post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    await Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: 'update successfull' });
    });
});

router.get('', async (req, res, next) => {
    await Post.find({})
        .then(document => {

            res.status(200).json({
                message: 'posts fetched successfully',
                posts: document
            });
        });
});

router.get('/:id', async (req, res, next) => {
    await Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'post not found' })
        }
    })
})

router.delete('/:id', async (req, res, next) => {
    await Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: 'post deleted' })
    })

});

module.exports = router;