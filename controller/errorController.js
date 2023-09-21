exports.handle404 = (err, req, res, next) => {
  if (err.status === 404 && err.message === "Not Found") {
    res.status(err.status).send({ message: err.message });
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send(err);
};
