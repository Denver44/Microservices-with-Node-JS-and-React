import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const commentStatus = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
      resolve(status);
    }, 5000);
  });
};

const checkComment = async (data) => {
  try {
    const status = await commentStatus(data);
    await axios.post('http://localhost:4005/events', {
      type: 'COMMENT_MODERATED',
      data: {
        status,
        commentId: data.commentId,
        postId: data.postId,
        content: data.content,
      },
    });
  } catch (error) {
    console.log('ERROR in processing data error: ', error.message);
  }
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'COMMENT_CREATED') await checkComment(data);
  res.send({});
});

app.listen(4004, () => console.log('Moderation Services Listening on 4004'));
