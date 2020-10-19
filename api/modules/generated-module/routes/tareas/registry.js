
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var tareasHelpRoute = apiRoute + '/tareas-help';
  global.app.express
        .route(tareasHelpRoute)
        .get(require('./help'));

  var tareasCollectionRoute = apiRoute + '/tareas';

  global.app.express
        .route(tareasCollectionRoute)
        .post(require('./create'))
        .get(require('./index'));

  global
    .app.express
    .param('tareasId', function (req, res, next, tareasId) {
        return models
          .Tareas
          .findByPk(tareasId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.tareas = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Tareas/:tareasId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Tareas/:tareasId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var tareasSingleRoute = tareasCollectionRoute + '/:tareasId';

  global.app.express
        .route(tareasSingleRoute)
        .patch(require('./update'))
        .get(require('./show'))
        .delete(require('./delete'));
};
