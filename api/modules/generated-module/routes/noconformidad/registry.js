
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var noconformidadHelpRoute = apiRoute + '/noconformidad-help';
  global.app.express
        .route(noconformidadHelpRoute)
        .get(require('./help'));

  var noconformidadCollectionRoute = apiRoute + '/noconformidad';

  global.app.express
        .route(noconformidadCollectionRoute)
        .post(require('./create'))
        .get(require('./index'));

  global
    .app.express
    .param('noconformidadId', function (req, res, next, noconformidadId) {
        return models
          .NoConformidad
          .findByPk(noconformidadId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.noconformidad = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'NoConformidad/:noconformidadId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'NoConformidad/:noconformidadId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var noconformidadSingleRoute = noconformidadCollectionRoute + '/:noconformidadId';

  global.app.express
        .route(noconformidadSingleRoute)
        .patch(require('./update'))
        .get(require('./show'))
        .delete(require('./delete'));
};
