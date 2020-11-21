
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var accionesHelpRoute = apiRoute + '/acciones-help';
  global.app.express
        .route(accionesHelpRoute)
        .get(require('./help'));

  var accionesCollectionRoute = apiRoute + '/acciones';

  global.app.express
        .route(accionesCollectionRoute)
        .post(require('./create'))
        .get(require('./index'));

  global
    .app.express
    .param('accionesId', function (req, res, next, accionesId) {
        return models
          .Acciones
          .findByPk(accionesId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.acciones = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Acciones/:accionesId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Acciones/:accionesId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var accionesSingleRoute = accionesCollectionRoute + '/:accionesId';

  global.app.express
        .route(accionesSingleRoute)
        .patch(require('./update'))
        .get(require('./show'))
        .delete(require('./delete'));
};
