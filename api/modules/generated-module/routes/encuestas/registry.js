
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var encuestasHelpRoute = apiRoute + '/encuestas-help';
  global.app.express
        .route(encuestasHelpRoute)
        .get(require('./help'));

  var encuestasCollectionRoute = apiRoute + '/encuestas';

  global.app.express
        .route(encuestasCollectionRoute)
        .post(require('./create'))
        .get(require('./index'));

  global
    .app.express
    .param('encuestasId', function (req, res, next, encuestasId) {
        return models
          .Encuestas
          .findByPk(encuestasId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.encuestas = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Encuestas/:encuestasId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Encuestas/:encuestasId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var encuestasSingleRoute = encuestasCollectionRoute + '/:encuestasId';

  global.app.express
        .route(encuestasSingleRoute)
        .patch(require('./update'))
        .get(require('./show'))
        .delete(require('./delete'));
};
