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
        .ObjetivosCalidad
        .create(req.body)
      })
        .then(function (objetivosX) {
          console.log(objetivosX.id);
          return Sequelize.Promise.mapSeries(req.body.Indicadores, 
            function(indicadoresX) {
              jsonAPIBody.data = objetivosX.toJSON();
              return models.Indicadores.findOrCreate({
                where: {
                  id:    indicadoresX,
                }})
                .spread(function(indicadorX, created){
                  if( created ){
                    return models.IndicadoresObjetivos.create({
                        IndicadoresId: indicadorX.id,
                        ObjetivosId: objetivosX.id
                    });
                } else {
                  return models.IndicadoresObjetivos.create({
                    IndicadoresId: indicadorX.id,
                    ObjetivosId: objetivosX.id
                });
              }
              })
          })
        })
    .then(function (data) {
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'objetivoscalidad/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'objetivoscalidad/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

