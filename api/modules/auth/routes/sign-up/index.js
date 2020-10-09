/**
 * Created by zxc on 26/03/18.
 */
'use strict';
var jwt = require('jsonwebtoken');
var lodash = require('lodash');
module.exports = function(req, res) {
  var jsonAPI = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  req.body.lastLogout = new Date().toISOString();
  return models
    .Usuario.create(req.body).then(function(user) {
      return res.status(201).json({
        data: user
      });
    }).catch(global.app.orm.Sequelize.ValidationError, function(error) {
      global.app.utils.logger.error(error, {
        module: 'auth/sign-up',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(400)
        .json(jsonAPI.processErrors(error, req, {
          file: __filename
        }));
    }).catch(function(error) {
      global.app.utils.logger.error(error, {
        module: 'auth/sign-up',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(500)
        .json(jsonAPI.processErrors(error, req, {
          file: __filename
        }));
    });

};