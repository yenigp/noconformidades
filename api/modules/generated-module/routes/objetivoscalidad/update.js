'use strict';

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

  var jsonAPIBody = {
    data: {}
  };

  return req
    .objetivoscalidad
    .update(req.body)
    .then(function (data) {
      return models
        .ObjetivosCalidad
        .findByPk(data.id, {include:[{all:true}]});
    })
    .then(function (objetivosX) {
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
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'objetivoscalidad/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'objetivoscalidad/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

