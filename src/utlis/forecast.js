const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b43b0272b79e73cfd5a9a2c691a81799&query=${latitude},${longtitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to get location, try again", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out, but it feels like ${data.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
