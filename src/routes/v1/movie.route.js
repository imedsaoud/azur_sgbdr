const express = require('express');
const movieController = require('../../controllers/movie.controller');
const router = express.Router();

router
  .route('/')
  .get(movieController.getMovies);


module.exports = router;
