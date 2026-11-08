// middlewares/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error("Middleware Error:", err);

  const defaultErrors = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong, please try again later",
  };

  // Mongoose validation error
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Duplicate key error (e.g. email already exists)
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(defaultErrors.statusCode).json({
    success: false,
    message: defaultErrors.message,
  });
};

module.exports = errorMiddleware;