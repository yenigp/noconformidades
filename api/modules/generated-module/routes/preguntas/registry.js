
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var preguntasHelpRoute = apiRoute + '/preguntas-help';
  global.app.express
        .route(preguntasHelpRoute)
        .get(require('./help'));

  var preguntasCollectionRoute = apiRoute + '/preguntas';

  global.app.express
        .route(preguntasCollectionRoute)
        .post([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./create'))
        .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('preguntasId', function (req, res, next, preguntasId) {
        return models
          .Preguntas
          .findByPk(preguntasId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.preguntas = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Preguntas/:preguntasId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Preguntas/:preguntasId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var preguntasSingleRoute = preguntasCollectionRoute + '/:preguntasId';

  global.app.express
        .route(preguntasSingleRoute)
        .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./update'))
        .get(global.security.ensureAuthenticated(), require('./show'))
        .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./delete'));
};
