'use strict';

module.exports = async function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  async function ObtenerRolJefeProceso(jefeproceso){
    return await models.Usuario.findByPk(jefeproceso).then(function(jefeprocesoX){
      return jefeprocesoX.RolId;
     })
  }
  
  return models.Roles.findOne({
    where: {id: await ObtenerRolJefeProceso(req.body.JefeProceso), nombre: "JefeProceso"}
  }).then(async function(usuarioX) {
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
    .app.orm.sequelize.transaction(async function (t) {
      return models
        .Proceso
        .create(req.body,{transaction:t});
    })
    .then(await function (data) {
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