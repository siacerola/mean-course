const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://sihar:HtcvdoVxADwcbSOY@cluster0.cwxk3fs.mongodb.net/node-angular?retryWrites=true&w=majority").then(() => {
    console.log('connected to database');
}).catch(() => {
    console.log('connection failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.post('/api/posts', async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await post.save();
    console.log(post);
    res.status(201).json({
        message: 'post added successfully'
    });
});

app.get('/api/posts', async (req, res, next) => {
    await Post.find({})
        .then(document => {
            console.log(document);
            res.status(200).json({
                message: 'posts fetched successfully',
                posts: document
            });
        });
});

app.delete('/api/posts/:id', async (req, res, next) => {
    await Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: 'post deleted' })
    })

});

module.exports = app;