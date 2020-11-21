'use strict';

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };
  return global
    .app.orm.sequelize.transaction(function (t) {
      return models
        .Preguntas
        .create(req.body,{transaction:t})
        .then(function (data) {
          return Sequelize.Promise.mapSeries(data, models.Respuestas.create())
            .then(([data, respuestas]) => {
              return models.Resultados.create({ PreguntaId: data.id, RespuestaId: respuestas.id, CreatorId: data.CreatorId},{
                transaction:t
              })
            })
        })
    })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'preguntas/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'preguntas/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

