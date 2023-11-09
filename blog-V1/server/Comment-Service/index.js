import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Here all our post will be saved.
const commentsByPostId = {};

// Create a comments associated with the given post ID.
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Retrieve all comments associated with the given Post ID.
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const post_comment = {
    id: commentId,
    content,
  };
  comments.push(post_comment);
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Comment Service Listening on 4001');
});
