
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var tipoacHelpRoute = apiRoute + '/tipoac-help';
  global.app.express
    .route(tipoacHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var tipoacCollectionRoute = apiRoute + '/tipoac';

  global.app.express
    .route(tipoacCollectionRoute)
    .post([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('tipoacId', function (req, res, next, tipoacId) {
      return models
        .TipoAC
        .findByPk(tipoacId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.tipoac = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'TipoAC/:tipoacId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'TipoAC/:tipoacId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var tipoacSingleRoute = tipoacCollectionRoute + '/:tipoacId';

  global.app.express
    .route(tipoacSingleRoute)
    .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./delete'));
};
