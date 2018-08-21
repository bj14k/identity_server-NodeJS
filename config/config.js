var env = process.env.NODE_ENV || 'DEV';
var config = {};

switch(env){ 
    case 'DEV': 
        config = require('./config.development.json');
        break;
    case 'PROD': 
        config = require('./config.production.json');
        break;
    default:
        config = require('./config.development.json');
        break;
}
var envConfig = config;

Object.keys(envConfig).forEach(k => process.env[k] = envConfig[k]);
