const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  DUBLICATE_MONGOOSE_ERROR_CODE,
  SALT_ROUNDS,
  SECRET_KEY,
  HTTP_OK,
  HTTP_CREATE,
} = require('../settings/conf');

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    next(new BadRequestError('Поля не могут быть пустыми.', ['email', 'password']));
  }
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.setHeader('Content-Type', 'application/json').status(
      HTTP_CREATE,
    ).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === DUBLICATE_MONGOOSE_ERROR_CODE) {
        next(new ConflictError('Такой e-mail уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        const obj = Object.keys(err.errors)[0];
        next(new BadRequestError(err.errors[obj].message));
      }
      next();
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError('Поля не могут быть пустыми.', ['email', 'password']));
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new BadRequestError('Пользователь не зарегистрирован.'));
      } else {
        bcrypt.compare(password, user.password, (err, data) => {
          if (err) {
            next(err);
          }
          if (data) {
            const token = jwt.sign(
              { _id: user._id },
              SECRET_KEY,
              { expiresIn: '7d' },
            );
            res.status(HTTP_OK).send({ message: 'Success!', access_token: token });
          } else {
            next(new UnauthorizedError('Не верные авторизационные данные!'));
          }
        });
      }
    });
};
