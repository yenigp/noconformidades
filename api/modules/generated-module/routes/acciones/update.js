'use strict';

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

  var jsonAPIBody = {
    data: {}
  };

  return req
    .acciones
    .update(req.body)
    .then(function (data) {
      return models
        .Acciones
        .findByPk(data.id, {include:[{all:true}]});
    })
    .then(function (accionX) {
      return Sequelize.Promise.mapSeries(req.body.Tareas, 
        function(tareasX) {
          console.log(tareasX)
          jsonAPIBody.data = accionX.toJSON();
          return models.Tareas.findOrCreate({
            where: {
              id:    tareasX.Tareas,
            }})
            .spread(function(tareaX, created){
              console.log(tareaX.id, accionX.id)
              if( created ){
                return models.AccionTarea.create({
                  AccionesId: accionX.id, 
                  TareasId: tareaX.id
                });
            } else {
              return models.AccionTarea.create({
                AccionesId: accionX.id, 
                TareasId: tareaX.id
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
        module   : 'acciones/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'acciones/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

