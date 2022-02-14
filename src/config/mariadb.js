const mariadb = require('mariadb');
const config = require('./config');

const pool = mariadb.createPool({
  host: config.mariadb.host, 
  port: config.mariadb.port,
  user: config.mariadb.user, 
  database: config.mariadb.name, 
  password: config.mariadb.pwd,
  connectionLimit: 5
});

module.exports = pool;