export const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error.code === 11000) {
    return res.status(400).json({ message: 'Duplicate value detected.', details: error.keyValue });
  }

  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error'
  });
};
