import * as GeoJsonGeometriesLookup from 'geojson-geometries-lookup';
import * as NodeGeocoder from 'node-geocoder';

export function getLocation(address) {
  const geocoder = NodeGeocoder({
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
    httpAdapter: 'https',
    provider: 'google',
  });

  return new Promise((resolve, reject) => {
    geocoder.geocode(address, (err, res) => {
      if (err) { return reject(err); }

      const [ data ] = res;
      const state = data.administrativeLevels.level1short;

      resolve({
        latitude: data.latitude,
        longitude: data.longitude,
        state,
      });
    });
  });
}

export function findDistrict(districtGeoData, state, latitude, longitude) {

  const features = Object.keys(districtGeoData)
    .filter((aDistrict) => aDistrict.includes(state))
    .map((aDistrict) => districtGeoData[aDistrict]);

  const glookup = new GeoJsonGeometriesLookup({ type: 'FeatureCollection', features });
  const containers = glookup.getContainers({ type: 'Point', coordinates: [ longitude, latitude ] });

  if (containers.features.length) {
    return containers.features[0].properties;
  }
}
