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
    model: models.Roles,
  });

  query.include=[
    {
      model: models.Usuario
    }
  ]

  query=jsonAPI.prepareQuery(query);
  if (req.loggedUser.RolId != 4){
      if (req.loggedUser.RolId != 5){
        if (req.loggedUser.RolId != 6) {
          return res.status(401).json({
            errors: [{
              field: "autorización",
              title: "usted no tiene permiso para ver los roles de los usuarios del sistema"
            }]
        })
      }   
    }
  }  
  return models
    .Roles.findAll(query)
    .then(function (data) {
      console.log(query)
      jsonAPIBody.data                  = data;
      jsonAPIBody.meta.pagination.count = data.length;
      global.app.utils.jsonAPI.cleanQuery(query);
      return models.Roles.count(query);
    })
    .then(function (total) {
      jsonAPIBody.meta.pagination.total = total;
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'roles/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'roles/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};
