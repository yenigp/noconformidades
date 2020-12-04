const { model } = require('mongoose');

exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var expedienteHelpRoute = apiRoute + '/expediente-help';
  global.app.express
        .route(expedienteHelpRoute)
        .get(require('./help'));

  var expedienteCollectionRoute = apiRoute + '/expediente';

  global.app.express
        .route(expedienteCollectionRoute)
        .post([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./create'))
        .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('expedienteId', function (req, res, next, expedienteId) {
        return models
          .Expediente
          .findByPk(expedienteId, {
            include: [{model: models.NoConformidad,
              include: [
                'Proceso',
                'Norma',
                'Tipo',
                'Area',
                'Sucursal',
                'Auditoria',
                'Incidencia',
                {
                  model: models.QuejasReclamaciones
                }
              ]
            }]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.expediente = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Expediente/:expedienteId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Expediente/:expedienteId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var expedienteSingleRoute = expedienteCollectionRoute + '/:expedienteId';

  global.app.express
        .route(expedienteSingleRoute)
        .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./update'))
        .get(global.security.ensureAuthenticated(), require('./show'))
        .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./delete'));
};
