const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { movieService } = require('../services');


const getMovies = catchAsync(async (req, res) => {
  const result = await movieService.queryMovies(req,res);
});

module.exports = {
  getMovies
};
