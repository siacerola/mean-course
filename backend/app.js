const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://sihar:HtcvdoVxADwcbSOY@cluster0.cwxk3fs.mongodb.net/?retryWrites=true&w=majority").then(() => {
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

app.post('/api/posts', (req, res, next) => {
    const posts = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(posts);
    res.status(201).json({
        message: 'post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: '123qwe',
            title: 'first server-side post',
            content: 'this is coming from server'
        },
        {
            id: 'ewqeq23',
            title: 'second server-side post',
            content: 'this is coming from server'
        }
    ];
    res.status(200).json({
        message: 'posts fetched successfully',
        posts: posts
    });
});

module.exports = app;