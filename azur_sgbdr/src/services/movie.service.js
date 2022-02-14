const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const pool = require('./../config/mariadb');


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMovies = async (filter, options,db) => {


  var userQuery = 'select * from film limit 10';

  movies = pool.query(userQuery)

  // const users = await User.paginate(filter, options);
  return movies;
};


module.exports = {
  queryMovies,
};
