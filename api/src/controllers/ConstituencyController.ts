import Constituency from '../models/constituency';

export function show(req, res) {
  return res.json(req.item.serialize());
}

export function join(req, res) {
  req.item.join(req.user)
    .then(() => res.status(200).end())
    .catch(message => res.status(422).json({ message }));
}