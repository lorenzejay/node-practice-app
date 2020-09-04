const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibG9yZW56ZWpheSIsImEiOiJja2U5NGFlOG4xeGk0MnFsdXFvZ2tpbnB0In0.I7yZJCgd4NLMG2TN1g_TwA&limit=1`;

  request({ url, json: true }, (error, { body: { features } } = {}) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longtitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
