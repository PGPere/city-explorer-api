'use strict';

class Forecast {
  constructor(day, lat, lon) {
    this.date = day.valid_date;
    this.desc = day.weather.description;
    this.lat = lat;
    this.lon = lon;
  }
}

module.exports = Forecast;
