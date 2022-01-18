'use strict';

const express = require('express');
require('dotenv').config();
const getWeather = require('./handlers/weather.js');
const getMovies = require('./handlers/movies.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen(PORT, () => console.log('Hello from Pedro Client'+PORT));
