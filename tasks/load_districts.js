const fs = require('fs');
const GeoJsonGeometriesLookup = require('geojson-geometries-lookup');
const glob = require('glob');
const NodeGeocoder = require('node-geocoder');

require('dotenv').config();


const ADDRESS = process.argv[2];
let DISTRICT_MAP;

loadDistricts().then(districtGeoData => {
	DISTRICT_MAP = districtGeoData;
	return getLocation(ADDRESS);
}).then(location => {
	
	return findDistrict(DISTRICT_MAP, location.state, location.latitude, location.longitude)
}).then(result => console.log(`${ADDRESS} is in ${result.District}`));


function getLocation(address) {
	const geocoder = NodeGeocoder({
		provider: 'google',
		httpAdapter: 'https',
	  apiKey: process.env.GEOCODER_API_KEY,
	  formatter: null        
	});

	return new Promise((resolve, reject) => {
		geocoder.geocode(address, (err, res) => {
			if (err) return reject(err);

			const [ data ] = res;
			const state = data.administrativeLevels.level1short;

			resolve({ 
				state,
				latitude: data.latitude,
				longitude: data.longitude
			});
		});
	});
}

function loadDistricts() {
	const directory = './data/districtGeoJSON';
	const districts = fs.readdirSync(directory, 'utf8');
	const dataMap = {};

	const promises = districts.map(aDistrict => {
		return new Promise((resolve, reject) => {

			fs.readFile(`${directory}/${aDistrict}`, 'utf8', (err, data) => {
				dataMap[aDistrict.replace('.geojson', '')] = JSON.parse(data);
				resolve();
			})
		});
	});

	return Promise.all(promises).then(() => Promise.resolve(dataMap));
}

function findDistrict(districtGeoData, state, latitude, longitude) {
	
	const features = Object.keys(districtGeoData)
		.filter(aDistrict => aDistrict.includes(state))
		.map(aDistrict => districtGeoData[aDistrict]);

	const glookup = new GeoJsonGeometriesLookup({ type: 'FeatureCollection', features });
	const containers = glookup.getContainers({ type: 'Point', coordinates: [ longitude, latitude ] });
	
	if (containers.features.length) {
		return containers.features[0].properties;
	}
}
