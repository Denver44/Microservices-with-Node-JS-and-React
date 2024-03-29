import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {}; // Here all our post will be saved.

// Retrieve all Posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Create a New Post
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Post Service Listening on 4000');
});
