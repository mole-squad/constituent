const GeoJsonGeometriesLookup = require('geojson-geometries-lookup');
const NodeGeocoder = require('node-geocoder');


module.exports.getLocation = function(address) {
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


module.exports.findDistrict = function(districtGeoData, state, latitude, longitude) {
	
	const features = Object.keys(districtGeoData)
		.filter(aDistrict => aDistrict.includes(state))
		.map(aDistrict => districtGeoData[aDistrict]);

	const glookup = new GeoJsonGeometriesLookup({ type: 'FeatureCollection', features });
	const containers = glookup.getContainers({ type: 'Point', coordinates: [ longitude, latitude ] });
	
	if (containers.features.length) {
		return containers.features[0].properties;
	}
}
