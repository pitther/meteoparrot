const globalConfig = require('../config');

const URL = 'ftp://ftp.ncdc.noaa.gov/pub/data/gsod/';

const DB = {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorsAliases: false,
    logging: false
};

module.exports = Object.assign({}, globalConfig, {
    URL,
    DB
});
