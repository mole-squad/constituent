import { findDistrict, getLocation } from './search';

export default function routes(app, districtMap) {

  app.get('/representatives', (req, res) => {
    const address = req.query.q;

    if (!address) {
      res.status(422);
      return res.end();
    }

    getLocation(address).then(({ state, latitude, longitude }) => {
      return findDistrict(districtMap, state, latitude, longitude);
    }).then((data) => res.json(data))
      .catch(() => {
        console.error('TODO');
      });
  });

}
