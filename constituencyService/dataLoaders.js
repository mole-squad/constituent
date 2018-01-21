const fs = require('fs');

module.exports.loadRepresentatives = function() {
	const currentNo = 115;
	let house, senate;

	return Promise.all([ 
		getChamberMembers('senate', currentNo),
		getChamberMembers('house', currentNo)
	]).;
};

function getChamberMembers(name, number) {
	return new Promise((resolve, reject) => {
		const reps = fs.readFile(`./data/${name}-${number}.json`, 'utf8', (err, data) => {
			const reps = JSON.parse(data);

			resolve(reps.members);
		});
	});
}


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
