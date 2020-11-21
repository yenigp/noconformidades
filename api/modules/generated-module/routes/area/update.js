'use strict';

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;

  var jsonAPIBody = {
    data: {}
  };

  if (req.area.SucursalId != req.loggedUser.SucursalId){
    return res.status(403).json({
      errors: [{
        field: "Autorización",
        title: "Usted no tiene acceso a actualizar dicha Área"
      }]
    })
  }
  return req
    .area
    .update(req.body)
    .then(function (data) {
      return models
        .Area
        .findByPk(data.id, {include:[{all:true}]});
    })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'area/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'area/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

