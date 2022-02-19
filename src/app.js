const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const path = require('path');

const { shows } = require('./routes');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello, World!' });
});

app.use('/api/shows', shows);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.log(error.stack);
  }
  res.status(500).send(error.message);
});

module.exports = app;
