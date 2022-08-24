const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SECRET_KEY } = require('../settings/conf');

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      next(new UnauthorizedError('Токен не найден!'));
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        next(new UnauthorizedError('Токен не действителен!'));
      }
      if (payload) {
        req.user = payload;
        next();
      }
    });
  } else {
    next(new UnauthorizedError('Требуется авторизация!'));
  }
};
