export function findByIdMiddleware(model) {
  return (req, res, next) => {
    model.findOne({ '_id': req.params.id }, (err, item) => {
      if (err) {
        console.error(err);
        return res.status(422).send(err);
      }

      if (!item) {
        return res.status(404).end();
      }

      req.item = item;
      next();
    });
  };
}