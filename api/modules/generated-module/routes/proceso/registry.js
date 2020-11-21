
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var procesoHelpRoute = apiRoute + '/proceso-help';
  global.app.express
    .route(procesoHelpRoute)
    .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./help'));

  var procesoCollectionRoute = apiRoute + '/proceso';

  global.app.express
    .route(procesoCollectionRoute)
    .post([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./create'))
    .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./index'));

  global
    .app.express
    .param('procesoId', function (req, res, next, procesoId) {
      return models
        .Proceso
        .findByPk(procesoId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.proceso = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Proceso/:procesoId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Proceso/:procesoId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var procesoSingleRoute = procesoCollectionRoute + '/:procesoId';

  global.app.express
    .route(procesoSingleRoute)
    .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./update'))
    .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./show'))
    .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./delete'));

  /*var procesoProfileRoute = '/v1/profile';

  global.app.express
    .route(procesoProfileRoute)
    .patch(function(req,res,next){
      req.proceso=req.loggedUser;
      return next();
    }, require('./update'))*/
};
