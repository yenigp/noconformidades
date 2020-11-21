
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var sucursalCollectionRoute = apiRoute + '/sucursal';

  global.app.express
    .route(sucursalCollectionRoute)
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('sucursalId', function (req, res, next, sucursalId) {
      return models
        .Sucursal
        .findByPk(sucursalId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.sucursal = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Sucursal/:sucursalId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Sucursal/:sucursalId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var sucursalSingleRoute = sucursalCollectionRoute + '/:sucursalId';

  global.app.express
    .route(sucursalSingleRoute)
    .get(global.security.ensureAuthenticated(), require('./show'));

};
