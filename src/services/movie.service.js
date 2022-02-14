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
const queryMovies = async (req,res) => {

  var numRows;
  var queryPagination;
  var numPerPage = parseInt(req.query.itemPerPage, 10) || 1;
  var page = parseInt(req.query.currentPage, 10) || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  pool.query('SELECT count(*) as numRows FROM film')
  .then(function(results) {
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
    console.log('number of pages:', numPages);
  })
  .then(() => pool.query('SELECT * FROM film ORDER BY ' + req.query.filteredItem + ' ' + req.query.sort +  ' LIMIT ' + limit))
  .then(function(results) {
    var movies = {
      movies: results
    };
    if (page < numPages) {
      movies.pagination = {
        pageNumber: numPages - 1,
        current: page,
        perPage: numPerPage,
        previous: page > 0 ? page - 1 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined
      }
    }
    else {
      movies.pagination = {
      err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
      }
      res.send('Page out of range')
    }

    res.send(movies)

  })
  .catch(function(err) {
    console.error(err);
  });
};


module.exports = {
  queryMovies,
};
