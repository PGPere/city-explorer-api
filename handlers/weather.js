'use strict';

const axios = require('axios');
const Forecast = require('../classes/Forecast.js');

const getWeather = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;
    const response = await axios.get(url);

    if (response) {
      const weatherArr = response.data.data.map(day => new Forecast(day, lat, lon));
      res.status(200).send(weatherArr);
    }
  } catch (err) {
    res.send(err.response);
  }
};

module.exports = getWeather;
