import express from 'express';
import axios from 'axios';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/events', (req, res) => {
  const event = req.body();
});

app.listen('4005', () => {
  console.log('Listening on 4005');
});
