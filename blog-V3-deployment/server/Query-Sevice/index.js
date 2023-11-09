import express from 'express';
import cors from 'cors';
import { fetchPost } from '../utils/helper.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/posts', async (_, res) => {
  try {
    const posts = await fetchPost();
    res.json(posts);
  } catch (error) {
    console.error('Error in Post-Service, error: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4002, () => console.log('Query Services Listening on 4002'));
