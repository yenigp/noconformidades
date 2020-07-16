'use strict';
/**
 * This configuration is seeder to sequelize via ../../.sequelizerc
 * */

var lodash = require('lodash');
var supportedEnvMap = [
  'development'
];

var envConfigToExport = {};

lodash.forEach(supportedEnvMap, function (env) {
  var envConfig = require('./' + env + '.json');

  var dbConfig      = envConfig.database;
  var activeDialect = dbConfig.activeDialect;
  var dialects      = dbConfig.dialects;

  envConfigToExport[env] = {
    dialect: activeDialect
  };

  lodash.merge(envConfigToExport[env], dialects[activeDialect],{});
});

module.exports = envConfigToExport;