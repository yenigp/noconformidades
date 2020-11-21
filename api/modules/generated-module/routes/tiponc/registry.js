
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var tiponcHelpRoute = apiRoute + '/tiponc-help';
  global.app.express
    .route(tiponcHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var tiponcCollectionRoute = apiRoute + '/tiponc';

  global.app.express
    .route(tiponcCollectionRoute)
    .post([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./create'))
    .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa() || global.security.isEspCalidadSucursal()], require('./index'));

  global
    .app.express
    .param('tiponcId', function (req, res, next, tiponcId) {
      return models
        .TipoNC
        .findByPk(tiponcId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.tiponc = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'TipoNC/:tiponcId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'TipoNC/:tiponcId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var tiponcSingleRoute = tiponcCollectionRoute + '/:tiponcId';

  global.app.express
    .route(tiponcSingleRoute)
    .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./delete'));

  /*var tiponcProfileRoute = '/v1/profile';

  global.app.express
    .route(tiponcProfileRoute)
    .patch(function(req,res,next){
      req.tiponc=req.loggedUser;
      return next();
    }, require('./update'))*/
};
