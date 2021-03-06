'use strict';

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;
  req.body.CreatorId = req.loggedUser.id;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  return models.Sucursal.findOne({
    where: {id: req.body.SucursalId}
  }).then(function(sucursalX) {
    if (!sucursalX) {
      return res.status(404).json({
        errors:[
          {
            field: "sucursal",
            title: "La Sucursal no existe"
          }
        ]
      })
  } else{
    return global
    .app.orm.sequelize.transaction(function (t) {
      return models
        .Area
        .create(req.body,{transaction:t});
    })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'area/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'area/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
  }
  }).catch(function(error){
  return res.status(500).json({
    errors:[
      {
        field: "error",
        title: error.message
      }
    ]
  })
  })
};