class customError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export default customError;

export const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    console.log(
      "customError :",
      " error status code : " + err.status,
      " error message : " + err.message
    );

    return res.status(err.status).json(err.message);
  }

  console.log(
    "unhandledError :" +
      " request method - " +
      req.method +
      " | request url - " +
      req.originalUrl +
      " | error message - " +
      err.message
  );
  return res.status(500).json("something went wrong");
};
