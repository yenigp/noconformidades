
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  /*var auditoriaHelpRoute = apiRoute + '/auditoria-help';
  global.app.express
    .route(auditoriaHelpRoute)
    .get(require('./help'));*/

  var quejasreclamacionesCollectionRoute = apiRoute + '/quejasreclamaciones';

  global.app.express
    .route(quejasreclamacionesCollectionRoute)
    //.post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .QuejasReclamaciones
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.quejasreclamaciones = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'QuejasReclamaciones/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'QuejasReclamaciones/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var quejasreclamacionesSingleRoute = quejasreclamacionesCollectionRoute + '/:id';

  global.app.express
    .route(quejasreclamacionesSingleRoute)
    //.patch(require('./update'))
    .get(require('./show'))
    //.delete(require('./delete'));

  var quejasreclamacionesProfileRoute = '/v1/profile';

  global.app.express
    .route(quejasreclamacionesProfileRoute)
    /*.patch(function(req,res,next){
      //req.auditoria=req.loggedUser;
      return next();
    }, require('./update'))*/
};
