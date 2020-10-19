
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var respuestasHelpRoute = apiRoute + '/respuestas-help';
  global.app.express
        .route(respuestasHelpRoute)
        .get(require('./help'));

  var respuestasCollectionRoute = apiRoute + '/respuestas';

  global.app.express
        .route(respuestasCollectionRoute)
        .post(require('./create'))
        .get(require('./index'));

  global
    .app.express
    .param('respuestasId', function (req, res, next, respuestasId) {
        return models
          .Respuestas
          .findByPk(respuestasId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.respuestas = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Respuestas/:respuestasId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Respuestas/:respuestasId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var respuestasSingleRoute = respuestasCollectionRoute + '/:respuestasId';

  global.app.express
        .route(respuestasSingleRoute)
        .patch(require('./update'))
        .get(require('./show'))
        .delete(require('./delete'));
};
