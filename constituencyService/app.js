const bodyParser  = require('body-parser');
const express = require('express');
require('dotenv').config();

const { loadDistricts, loadRepresentatives } = require('./dataLoaders');
const { findDistrict, getLocation } = require('./search');

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