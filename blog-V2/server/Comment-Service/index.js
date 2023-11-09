import express from 'express';
import cors from 'cors';
import async from 'async';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { updateCommentForAPost } from '../utils/helper.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create comments associated with given Post ID.
app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  const commentId = randomBytes(4).toString('hex');

  async.waterfall(
    [
      (cbl) => {
        updateCommentForAPost({
          status: 'pending',
          postId,
          content,
          commentId,
        })
          .then((data) => cbl(null, data))
          .catch((error) => cbl(error));
      },
      (data, cbl) => {
        try {
          axios.post('http://localhost:4005/events', {
            type: 'COMMENT_CREATED',
            data,
          });
          cbl(null);
        } catch (error) {
          cbl(error);
        }
      },
    ],
    (err) => {
      if (err) res.json({ status: 500, message: 'Internal Server Error' });
      else res.json({ message: 'comment created successfully' });
    }
  );
});

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);

  const { type, data } = req.body;

  if (type === 'COMMENT_MODERATED') {
    const { postId, commentId, status, content } = data;

    const updatedComment = await updateCommentForAPost({
      commentId,
      postId,
      status,
      content,
    });

    await axios.post('http://localhost:4005/events', {
      type: 'COMMENT_UPDATED',
      data: updatedComment,
    });
  }
  res.send({});
});

app.listen(4001, () => console.log('Comment Service Listening on 4001'));
