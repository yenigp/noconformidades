'use strict';

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  return models.Usuario.findOne({
    where: {id: req.body.jefeproceso, rol: 'jefeMercado'}
  }).then(function(usuarioX) {
    if (!usuarioX) {
      return res.status(404).json({
        errors:[
          {
            field: "jefe de proceso",
            title: "No existe ningún usuario que su rol sea jefe de proceso"
          }
        ]
      })
  } else{
    return global
    .app.orm.sequelize.transaction(function (t) {
      return models
        .Proceso
        .create(req.body,{transaction:t});
    })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'proceso/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'proceso/create',
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