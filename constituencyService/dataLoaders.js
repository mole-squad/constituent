const fs = require('fs');


require('dotenv').config();





module.exports.loadDistricts = function() {
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
