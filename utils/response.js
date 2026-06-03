const SucessResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,

    data,
    statusCode,
  });
};
const failResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data,
    statusCode,
  });
};
const errorResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: true,
    data,
  });
};

module.exports = {
  SucessResponse,
  errorResponse,
  failResponse
};
