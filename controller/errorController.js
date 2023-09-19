exports.handle404 = (err, req,res,next) => {

    if (err.status === 404 && err.message==='Not Found') {
        res.status(err.status).send({message: err.message});
}}

exports.handle400 = (err, req, res, next) => {

  if (err.status === 400 && err.message==='Bad Request') {
    res.status(err.status).send({ message: err.message });
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
};