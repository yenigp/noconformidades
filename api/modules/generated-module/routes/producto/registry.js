
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var productoHelpRoute = apiRoute + '/producto-help';
  global.app.express
    .route(productoHelpRoute)
    .get(require('./help'));

  var productoCollectionRoute = apiRoute + '/producto';

  global.app.express
    .route(productoCollectionRoute)
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('productoId', function (req, res, next, productoId) {
      return models
        .Producto
        .findByPk(productoId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.producto = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Producto/:productoId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Producto/:productoId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var productoSingleRoute = productoCollectionRoute + '/:productoId';

  global.app.express
    .route(productoSingleRoute)
    .get(global.security.ensureAuthenticated(), require('./show'))
};
