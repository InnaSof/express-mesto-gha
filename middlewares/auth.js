const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SECRET_KEY } = require('../settings/conf');

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    next(new UnauthorizedError('Требуется авторизация!'));
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      next(new UnauthorizedError('Токен не действителен!'));
    }
    if (user) {
      req.user = user;
      next();
    } else {
      next();
    }
  });
};

module.exports = verifyToken;
