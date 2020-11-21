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


  query.include=[{model: models.Auditoria}]


  query=jsonAPI.prepareQuery(query);
  if (req.loggedUser.RolId != 4){
    query.where.TipoId = 4
    query.where.SucursalId = req.loggedUser.SucursalId;
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
        module   : 'auditoria/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'auditoria/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};
