
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var mercadoHelpRoute = apiRoute + '/mercado-help';
  global.app.express
    .route(mercadoHelpRoute)
    .get(require('./help'));

  var mercadoCollectionRoute = apiRoute + '/mercado';

  global.app.express
    .route(mercadoCollectionRoute)
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('mercadoId', function (req, res, next, mercadoId) {
      return models
        .Mercado
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.mercado = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Mercado/:mercadoId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Mercado/:mercadoId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var mercadoSingleRoute = mercadoCollectionRoute + '/:mercadoId';

  global.app.express
    .route(mercadoSingleRoute)
    .get(global.security.ensureAuthenticated(), require('./show'))

};
