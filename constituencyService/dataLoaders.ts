import * as fs from 'fs';

export function loadRepresentatives() {
  const currentNo = 115;

  return Promise.all([
    getChamberMembers('senate', currentNo),
    getChamberMembers('house', currentNo),
  ]);
}

function getChamberMembers(name, congressNumber) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./data/${name}-${congressNumber}.json`, 'utf8', (err, data) => {
      const reps = JSON.parse(data);

      resolve(reps.members);
    });
  });
}

export function loadDistricts() {
  const directory = './data/districtGeoJSON';
  const districts = fs.readdirSync(directory);
  const dataMap = {};

  const promises = districts.map((aDistrict) => {
    return new Promise((resolve, reject) => {

      fs.readFile(`${directory}/${aDistrict}`, 'utf8', (err, data) => {
        dataMap[aDistrict.replace('.geojson', '')] = JSON.parse(data);
        resolve();
      });
    });
  });

  return Promise.all(promises).then(() => Promise.resolve(dataMap));
}
