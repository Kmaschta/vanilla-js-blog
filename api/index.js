import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const { MONGODB_ENDPOINT } = process.env;

if (!MONGODB_ENDPOINT) {
    throw new Error('The variable MONGODB_ENDPOINT is not set');
}

mongoose.connect(MONGODB_ENDPOINT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    createdAt: Date,
});

const Post = mongoose.model('Post', postSchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();

    res.send(posts);
});

app.post('/api/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        author: req.body.title,
        body: req.body.body,
        createdAt: new Date(),
    });

    await post.save();

    res.redirect('/');
});

module.exports = app;
