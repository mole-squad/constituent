import * as bodyParser  from 'body-parser';
import * as express from 'express';
import * as dotenv from 'dotenv';

import { loadDistricts, loadRepresentatives } from './dataLoaders';
import { findDistrict, getLocation } from './search';

dotenv.config();
const app = express();

app.set('host', '0.0.0.0');
app.set('port', process.env.SERVER_PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let DISTRICT_MAP;
app.get('/representatives', (req, res) => {
	const address = req.query.q;
	
	if (!address) {
		res.status(422);
		return res.end();
	}

	getLocation(address).then(({ state, latitude, longitude }) => {
		return findDistrict(DISTRICT_MAP, state, latitude, longitude);
	}).then(data => res.json(data))
		.catch(() => console.error('TODO'));
});

const startApp = () => {
	app.listen(app.get('port'), () => {
	  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
	  console.log('  Press CTRL-C to stop\n');
	});
};

loadDistricts().then(districtGeoData => {
	DISTRICT_MAP = districtGeoData;	
	return loadRepresentatives();
}).then(([ senateMembers, houseMembers ]) => {


}).then(() => startApp());