
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var categoriasHelpRoute = apiRoute + '/categorias-help';
  global.app.express
        .route(categoriasHelpRoute)
        .get(require('./help'));

  var categoriasCollectionRoute = apiRoute + '/categorias';

  global.app.express
        .route(categoriasCollectionRoute)
        .post([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./create'))
        .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('categoriasId', function (req, res, next, categoriasId) {
        return models
          .Categorias
          .findByPk(categoriasId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.categorias = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Categorias/:categoriasId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Categorias/:categoriasId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var categoriasSingleRoute = categoriasCollectionRoute + '/:categoriasId';

  global.app.express
        .route(categoriasSingleRoute)
        .patch([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./update'))
        .get(global.security.ensureAuthenticated(), require('./show'))
        .delete([global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal()], require('./delete'));
};
