'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

class Forecast {
  constructor(day, lat, lon) {
    this.date = day.valid_date;
    this.desc = day.weather.description;
    this.lat = lat;
    this.lon = lon;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.avgVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.image = movie.poster_path;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}

app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;
  const response = await axios.get(url);

  if (!lat || !lon) {
    res.status(400).send('bad request');
  }

  if (response) {
    const weatherArr = response.data.data.map(day => new Forecast(day, lat, lon));
    res.status(200).send(weatherArr);

  } else {
    res.status(204).send('city not found');
  }
});

app.get('/movies', async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  const response = await axios.get(url);

  if (!searchQuery) {
    res.status(400).send('bad request');
  }

  if (response) {
    const moviesArr = response.data.results.map(movie => new Movie(movie));
    res.status(200).send(moviesArr);

  } else {
    res.status(204).send('movie not found');
  }

});

app.listen(PORT, () => console.log('Hello from Pedro Client'+PORT));
