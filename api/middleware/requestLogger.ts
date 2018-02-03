export default function requestLogger(req, res, next) {
  const { path, method } = req;

  next();

  const status = res.statusCode.toString();
  // tslint:disable-next-line
  console.log(`${status.padEnd(4)}${method.padEnd(8)}${req.path}`);
}
