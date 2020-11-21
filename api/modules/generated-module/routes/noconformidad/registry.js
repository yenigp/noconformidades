
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var noconformidadHelpRoute = apiRoute + '/noconformidad-help';
  global.app.express
        .route(noconformidadHelpRoute)
        .get(global.security.ensureAuthenticated(), require('./help'));

  var noconformidadCollectionRoute = apiRoute + '/noconformidad';

  global.app.express
        .route(noconformidadCollectionRoute)
        .post(global.security.ensureAuthenticated(), require('./create'))
        .get(global.security.ensureAuthenticated(), require('./index'));

        global
        .app.express
        .param('noconformidadId', function (req, res, next, noconformidadId) {
            return models
              .NoConformidad
              .findByPk(noconformidadId, {
                include: [
                  {
                    model: models.Incidencia
                  },
                  {
                    model: models.Auditoria
                  },
                  {
                    model: models.QuejasReclamaciones
                  },
                  {
                    model: models.NCAcciones,
                    include: [
                      {
                        model: models.Acciones,
                        attributes: ['codigo', 'estado', 'fechacumplimiento']
                      },
                    ]
                  }
                ]
              }).then(function (data) {
                if (!data) {
                  return res.sendStatus(404); // Not Found.
                }
    
                req.noconformidad = data;
                return next();
                
              })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'NoConformidad/:noconformidadId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'NoConformidad/:noconformidadId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var noconformidadSingleRoute = noconformidadCollectionRoute + '/:noconformidadId';

  global.app.express
        .route(noconformidadSingleRoute)
        .patch(global.security.ensureAuthenticated(), require('./update'))
        .get(global.security.ensureAuthenticated(), require('./show'))
        .delete(global.security.ensureAuthenticated(), require('./delete'));
};