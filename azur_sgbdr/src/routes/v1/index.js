const express = require('express');
const movieRoute = require('./movie.route')
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/movies',
    route: movieRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
