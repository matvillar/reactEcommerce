const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next); // instead of using a bunch of try catch blocks, we can use this asyncHandler function to catch errors and pass them to the error handler middleware

export default asyncHandler;
