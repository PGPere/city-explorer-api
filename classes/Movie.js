'use strict';

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

module.exports = Movie;
