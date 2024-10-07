const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);

  if (
    err.name === 'BadRequestError' ||
    err.name === 'NotFoundError'
  ) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(err.status || 500).json({
    message: err.message || 'An error occurred in the server',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandlerMiddleware;