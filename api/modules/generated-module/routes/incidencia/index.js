'use strict';

var lodash  = require('lodash');

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var jsonAPI = global.app.utils.jsonAPI;

  var jsonAPIBody = {
    meta: {
      pagination: {}
    },
    data: []
  };

  var query = jsonAPI.buildQueryFromReq({
    req  : req,
    model: models.NoConformidad
  });


  query.include=['Incidencia',
  'Proceso',
  'Norma']


  query=jsonAPI.prepareQuery(query);
  if (req.loggedUser.RolId != 4){
    query.where.TipoId = 2
    query.where.SucursalId = req.loggedUser.SucursalId;
  }
  if (req.loggedUser.RolId == 7) {
    query.where.EspCalidad = req.loggedUser.id;
  }
  if (req.loggedUser.RolId == 3) {
    query.where.JefeProceso = req.loggedUser.id;
  }
  return models
    .NoConformidad.findAll(query)
    .then(function (data) {
      console.log(data)
      jsonAPIBody.data                  = data;
      jsonAPIBody.meta.pagination.count = data.length;
      global.app.utils.jsonAPI.cleanQuery(query);
      return models.NoConformidad.count(query);
    })
    .then(function (total) {
      jsonAPIBody.meta.pagination.total = total;
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'incidencia/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'incidencia/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};