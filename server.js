'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');
// const { response } = require('express');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// app.get('/',(request, response) => {
//   response.send('hello from Pedro client server');
// });

class Forecast {
  constructor(day, lat, lon) {
    this.date = day.valid_date;
    this.desc = day.weather.description;
    this.lat = lat;
    this.lon = lon;
  }
}

const truncate = (fullString) => {
  if (!fullString) return;

  fullString = fullString.toString();
  const dotIndex = fullString.indexOf('.');
  return dotIndex ? fullString.slice(0, dotIndex + 3) : fullString;
};

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  if (!lat || !lon || !searchQuery) {
    res.status(400).send('bad request');
  }

  // try {
  const result = weatherData.find(obj => truncate(obj.lat) === truncate(lat) && truncate(obj.lon) === truncate(lon));
  if (result) {
    const weatherArr = result.data.map(day => new Forecast(day, lat, lon));
    res.status(200).send(weatherArr);
  // } catch(error) {
  //   handleError(error,res);
  // }
  } else {

    res.status(404).send('city not found');

  }
});

// function handleError(error, res) {
//   console.log(error);
//   res.status(500).send('Unexpected Server Error-Try Again');
// }


app.listen(PORT, () => console.log(`listening on ${PORT}`));
