
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var incidenciaHelpRoute = apiRoute + '/incidencia-help';
  global.app.express
    .route(incidenciaHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var incidenciaCollectionRoute = apiRoute + '/incidencia';

  global.app.express
    .route(incidenciaCollectionRoute)
    .post(global.security.ensureAuthenticated(), global.security.isSupervisor(), require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('incidenciaId', function (req, res, next, incidenciaId) {
      return models
        .Incidencia
        .findByPk(incidenciaId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.incidencia = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Incidencia/:incidenciaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'incidencia/:incidenciaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var incidenciaSingleRoute = incidenciaCollectionRoute + '/:incidenciaId';

  global.app.express
    .route(incidenciaSingleRoute)
    .patch(global.security.ensureAuthenticated(), require('./update'))
    .get(require('./show'))
    .delete(global.security.ensureAuthenticated(), require('./delete'));

  /*var incidenciaProfileRoute = '/v1/profile';

  global.app.express
    .route(incidenciaProfileRoute)
    .patch(function(req,res,next){
      req.incidencia=req.loggedUser;
      return next();
    }, require('./update'))*/
};
