
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var reservaCollectionRoute = apiRoute + '/reserva';

  global.app.express
    .route(reservaCollectionRoute)
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('reservaId', function (req, res, next, reservaId) {
      return models
        .Reserva
        .findByPk(reservaId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.reserva = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Reserva/:reservaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Reserva/:reservaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var reservaSingleRoute = reservaCollectionRoute + '/:reservaId';

  global.app.express
    .route(reservaSingleRoute)
    .get(global.security.ensureAuthenticated(), require('./show'));
    
};
