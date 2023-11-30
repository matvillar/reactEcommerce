const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // create new error
  res.status(404); // set status to 404
  next(error); // pass error to error handler middleware
};

const errorHandler = (err, req, res, next) => {
  // set status to 500 if status is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check mongoose error ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Something went wrong! Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  }); // set status to statusCode
};

export { notFound, errorHandler };
