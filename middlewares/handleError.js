const InternalServerError = require('../errors/InternalServerError');

module.exports.handleError = (err, req, res, next) => {
  if (err.statusCode) {
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
  } else {
    next(new InternalServerError());
  }
};
