
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var agenciaviajesHelpRoute = apiRoute + '/agenciaviajes-help';
  global.app.express
    .route(agenciaviajesHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var agenciaviajesCollectionRoute = apiRoute + '/agenciaviajes';

  global.app.express
    .route(agenciaviajesCollectionRoute)
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('agenciaviajesId', function (req, res, next, agenciaviajesId) {
      return models
        .AgenciaViajes
        .findByPk(agenciaviajesId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.agenciaviajes = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'AgenciaViajes/:agenciaviajesId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'AgenciaViajes/:agenciaviajesId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var agenciaviajesSingleRoute = agenciaviajesCollectionRoute + '/:agenciaviajesId';

  global.app.express
    .route(agenciaviajesSingleRoute)
    .get(global.security.ensureAuthenticated(), require('./show'))
    
};
