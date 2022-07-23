import express from 'express';
import { randomBytes } from 'crypto';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const commentsByPostId = {}; // Here all our post will be saved.

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const post_comment = {
    id: commentId,
    title: content,
  };
  comments.push(post_comment);
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
