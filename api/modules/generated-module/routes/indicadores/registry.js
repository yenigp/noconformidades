
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var indicadoresHelpRoute = apiRoute + '/indicadores-help';
  global.app.express
        .route(indicadoresHelpRoute)
        .get(global.security.ensureAuthenticated(), require('./help'));

  var indicadoresCollectionRoute = apiRoute + '/indicadores';

  global.app.express
        .route(indicadoresCollectionRoute)
        .post([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./create'))
        .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./index'));

  global
    .app.express
    .param('indicadoresId', function (req, res, next, indicadoresId) {
        return models
          .Indicadores
          .findByPk(indicadoresId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.indicadores = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Indicadores/:indicadoresId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Indicadores/:indicadoresId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var indicadoresSingleRoute = indicadoresCollectionRoute + '/:indicadoresId';

  global.app.express
        .route(indicadoresSingleRoute)
        .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./update'))
        .get(global.security.ensureAuthenticated(), require('./show'))
        .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./delete'));
};
