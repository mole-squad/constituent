import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';

import { loadDistricts, loadRepresentatives } from './dataLoaders';
import routes from './routes';

dotenv.config();
const app = express();

app.set('host', '0.0.0.0');
app.set('port', process.env.CONSTITUENCY_SERVICE_PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startApp = () => {
  app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  });
};

let districtMap;
loadDistricts().then((districtGeoData) => {
  districtMap = districtGeoData;
  return loadRepresentatives();
}).then(([ senateMembers, houseMembers ]) => {
  routes(app, districtMap);
  startApp();
});
