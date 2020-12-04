'use strict';

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

  var jsonAPIBody = {
    data: {}
  };

  return req
    .indicadores
    .update(req.body)
    .then(function (data) {
      return models
        .Indicadores
        .findByPk(data.id, {include:[{all:true}]});
    })
    .then(function (indicadorX) {
      return Sequelize.Promise.mapSeries(req.body.ObjetivosCalidad, 
        function(objetivoscalidadX) {
          console.log(objetivoscalidadX);
          jsonAPIBody.data = indicadorX.toJSON();
          return models.ObjetivosCalidad.findOrCreate({
            where: {
              id:    objetivoscalidadX,
            }})
            .spread(function(objetivoX, created){
              console.log(objetivoX)
              if( created ){
                return models.IndicadoresObjetivos.create({
                    IndicadoresId: indicadorX.id,
                    ObjetivosId: objetivoX.id
                });
            } else {
              return models.IndicadoresObjetivos.create({
                IndicadoresId: indicadorX.id,
                ObjetivosId: objetivoX.id
            });
          }
          })
        })
    })
    .then(function (data) {
      //jsonAPIBody.data = data.toJSON();
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'indicadores/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'indicadores/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

