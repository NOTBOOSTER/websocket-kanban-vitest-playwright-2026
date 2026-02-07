const Logger = require("../utils/logger");
const ApiError = require("../utils/ApiError");

const logger = new Logger("ErrorHandler");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) statusCode = 500;
  if (!message) message = "Internal Server Error";

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (statusCode >= 500) {
    logger.error(message, err);
  } else {
    logger.warn(message);
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
