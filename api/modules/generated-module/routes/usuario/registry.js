
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var usuarioHelpRoute = apiRoute + '/usuario-help';
  global.app.express
    .route(usuarioHelpRoute)
    .get([global.security.ensureAuthenticated(), global.security.isAdmin()], require('./help'));

  var usuarioCollectionRoute = apiRoute + '/usuario';

  global.app.express
    .route(usuarioCollectionRoute)
    .post([global.security.ensureAuthenticated(), global.security.ensureSucursal(), global.security.isAdmin()],require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('usuarioId', function (req, res, next, usuarioId) {
      return models
        .Usuario
        .findByPk(usuarioId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.usuario = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Usuario/:usuarioId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Usuario/:usuarioId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var usuarioSingleRoute = usuarioCollectionRoute + '/:usuarioId';

  global.app.express
    .route(usuarioSingleRoute)
    .patch(global.security.ensureAuthenticated(), require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete([global.security.ensureAuthenticated(), global.security.isAdmin(), global.security.ensureUsuario()], require('./delete'));

  var usuarioProfileRoute = '/v1/profile';

  global.app.express
    .route(usuarioProfileRoute)
    .patch(global.security.ensureAuthenticated(),function(req,res,next){
      req.usuario=req.loggedUser;
      return next();
    }, require('./update'))
};
