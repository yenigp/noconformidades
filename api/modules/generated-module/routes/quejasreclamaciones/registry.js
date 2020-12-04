
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var quejasreclamacionesHelpRoute = apiRoute + '/quejasreclamaciones-help';
  global.app.express
    .route(quejasreclamacionesHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var quejasreclamacionesCollectionRoute = apiRoute + '/quejasreclamaciones';

  global.app.express
    .route(quejasreclamacionesCollectionRoute)
    .post(global.security.ensureAuthenticated(), global.security.isEspCalidadSucursal(), require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('quejasreclamacionesId', function (req, res, next, quejasreclamacionesId) {
      return models
        .QuejasReclamaciones
        .findByPk(quejasreclamacionesId, {
          include: [{model: models.Producto},
            {model: models.ProdServicio},
            {model: models.Reserva},{
            model: models.NoConformidad,
            include: ['Proceso', 'Norma', models.Usuario]
          }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.quejasreclamaciones = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'QuejasReclamaciones/:quejasreclamacionesId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'QuejasReclamaciones/:quejasreclamacionesId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var quejasreclamacionesSingleRoute = quejasreclamacionesCollectionRoute + '/:quejasreclamacionesId';

  global.app.express
    .route(quejasreclamacionesSingleRoute)
    .patch(global.security.ensureAuthenticated(), require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete(global.security.ensureAuthenticated(), global.security.isJefeProceso(), require('./delete'));

};
