import express from 'express';
import axios from 'axios';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log(event);
  try {
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4004/events', event);
  } catch (error) {
    console.log('ERROR in Event service err: ', error.message);
  }
  res.send({ status: 'OK' });
});

app.listen('4005', () => {
  console.log('Event bus Service Listening on 4005');
});
