class BadRequestError extends Error {
  constructor(message, detail = null) {
    super(message);
    this.statusCode = 400;
    this.detail = detail;
  }
}

module.exports = BadRequestError;
