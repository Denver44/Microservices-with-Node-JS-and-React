import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/users/currentUser', (req, res) => {
  res.status(200).json({
    msg: 'Hi there',
  });
});

app.listen(PORT, () => {
  console.log(`Auth Server started on ${PORT}!!`);
});
