const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().description('host to connect to the maria db'),
    DB_PORT: Joi.number().description('port to connect to the maria db'),
    DB_USER: Joi.string().description('user of the db'),
    DB_PWD: Joi.string().description('pwd of the db'),
    DB_NAME: Joi.string().description('name of the db'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mariadb: {
    host: envVars.DB_HOST,
    port : envVars.DB_PORT,
    user : envVars.DB_USER,  
    pwd : envVars.DB_PWD,
    name : envVars.DB_NAME,      
  }
};
