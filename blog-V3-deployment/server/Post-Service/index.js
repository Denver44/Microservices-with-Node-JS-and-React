import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { createPost } from '../utils/helper.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a New Post
app.post('/posts', async (req, res) => {
  try {
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');

    const post = await createPost({
      id,
      title,
      comments: [],
    });

    await axios.post('http://localhost:4005/events', {
      type: 'POST_CREATED',
      data: post,
    });

    res.json({
      status: 200,
      message: 'post has been created successfully',
    });
  } catch (error) {
    console.error('Error in Post-Service, error: ', error.message);
    res.json({ status: 500, message: 'error occurred creating post' });
  }
});

app.listen(4000, () => console.log('Post Service Listening on 4000'));
