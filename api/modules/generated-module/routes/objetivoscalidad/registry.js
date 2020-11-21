
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var objetivoscalidadHelpRoute = apiRoute + '/objetivoscalidad-help';
  global.app.express
        .route(objetivoscalidadHelpRoute)
        .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./help'));

  var objetivoscalidadCollectionRoute = apiRoute + '/objetivoscalidad';

  global.app.express
        .route(objetivoscalidadCollectionRoute)
        .post([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./create'))
        .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./index'));

  global
    .app.express
    .param('objetivoscalidadId', function (req, res, next, objetivoscalidadId) {
        return models
          .ObjetivosCalidad
          .findByPk(objetivoscalidadId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.objetivoscalidad = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'ObjetivosCalidad/:objetivoscalidadId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'ObjetivosCalidad/:objetivoscalidadId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var objetivoscalidadSingleRoute = objetivoscalidadCollectionRoute + '/:objetivoscalidadId';

  global.app.express
        .route(objetivoscalidadSingleRoute)
        .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./update'))
        .get([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./show'))
        .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadEmpresa()], require('./delete'));
};
