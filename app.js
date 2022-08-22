const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { celebrate, Joi, errors } = require('celebrate');
const verifyToken = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');

const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', verifyToken, userRouter);
app.use('/cards', verifyToken, cardRouter);

app.use(handleError);

// app.use(errors());

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
