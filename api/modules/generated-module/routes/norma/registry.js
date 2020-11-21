
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var normaHelpRoute = apiRoute + '/norma-help';
  global.app.express
    .route(normaHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var normaCollectionRoute = apiRoute + '/norma';

  global.app.express
    .route(normaCollectionRoute)
    .post([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()],require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('normaId', function (req, res, next, normaId) {
      return models
        .Norma
        .findByPk(normaId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.norma = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Norma/:normaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Norma/:normaId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var normaSingleRoute = normaCollectionRoute + '/:normaId';

  global.app.express
    .route(normaSingleRoute)
    .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./delete'));

  /*var normaProfileRoute = '/v1/profile';

  global.app.express
    .route(normaProfileRoute)
    .patch(function(req,res,next){
      req.norma=req.loggedUser;
      return next();
    }, require('./update'))*/
};
