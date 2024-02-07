const express = require('express');

const app = express();



app.use('/api/posts', (req, res, next) => {
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
        message: 'posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;