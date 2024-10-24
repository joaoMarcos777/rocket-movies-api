class AppError {
  message;
  statusCode;

  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode || 400;
  }
}

module.exports = AppError;
