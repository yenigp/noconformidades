
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var auditoriaHelpRoute = apiRoute + '/auditoria-help';
  global.app.express
    .route(auditoriaHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var auditoriaCollectionRoute = apiRoute + '/auditoria';

  global.app.express
    .route(auditoriaCollectionRoute)
    .post(global.security.ensureAuthenticated(), require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('auditoriaId', function (req, res, next, auditoriaId) {
      return models
        .Auditoria
        .findByPk(auditoriaId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.auditoria = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Auditoria/:auditoriaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Auditoria/:auditoriaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var auditoriaSingleRoute = auditoriaCollectionRoute + '/:auditoriaId';

  global.app.express
    .route(auditoriaSingleRoute)
    .patch(global.security.ensureAuthenticated(), require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete(global.security.ensureAuthenticated(), require('./delete'));

  /*var auditoriaProfileRoute = '/v1/profile';

  global.app.express
    .route(auditoriaProfileRoute)
    .patch(function(req,res,next){
      req.auditoria=req.loggedUser;
      return next();
    }, require('./update'))*/
};
