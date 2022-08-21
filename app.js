const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

function Error(err, req, res, next) {
  if (err.detail) {
    res.status(err.statusCode).send({
      message: err.message,
      detail: err.detail,
    });
  } else {
    res.status(err.statusCode).send({
      message: err.message,
    });
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(Error);

app.use((req, res) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ message: 'Page Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT);
