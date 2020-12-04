'use strict';

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

  var jsonAPIBody = {
    data: {}
  };

  return req
    .preguntas
    .update(req.body)
    .then(function (data) {
      return models
        .Preguntas
        .findByPk(data.id, {include:[{all:true}]});
    })
    .then(function (data) {
      if(req.loggedUser.RolId == 1) {
        jsonAPIBody.data = data.toJSON();
        return Sequelize.Promise.mapSeries(data, models.Respuestas.create())
        .then(([data, respuestas]) => {
          return models.Resultados.create({ PreguntaId: data.id, RespuestaId: respuestas.id, CreatorId: data.CreatorId},{
            transaction:t
          })
        })
      } else {
        jsonAPIBody.data = data.toJSON();
      }  
    })
    .then(function (data) {
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'preguntas/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'preguntas/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

