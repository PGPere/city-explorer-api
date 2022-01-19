'use strict';

const axios = require('axios');
const Forecast = require('../classes/Forecast.js');
const cache = require('../data/cache.js');

const getWeather = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const WEATHER_CACHE_KEY = `${lat}${lon}Weather`;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;

    if (cache[WEATHER_CACHE_KEY] && (Date.now() - cache[WEATHER_CACHE_KEY].timeStamp) < (1000 * 60 * 60 * 3)) {
      console.log('weather cache hit');
      res.send(cache[WEATHER_CACHE_KEY].weatherData);
    } else {
      const response = await axios.get(url);
      if (response) {
        const weatherArr = response.data.data.map(day => new Forecast(day, lat, lon));
        console.log('weather cache miss');
        cache[WEATHER_CACHE_KEY] = {
          weatherData: weatherArr,
          timeStamp: Date.now()
        };
        res.status(200).send(weatherArr);
      }
    }
  } catch (err) {
    res.send('error');
  }
};

module.exports = getWeather;
