
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  //var incidenciaHelpRoute = apiRoute + '/incidencia-help';
  /*global.app.express
    .route(incidenciaHelpRoute)
    .get(require('./help'));*/

  var incidenciaCollectionRoute = apiRoute + '/incidencia';

  global.app.express
    .route(incidenciaCollectionRoute)
    //.post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .Incidencia
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.incidencia = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Incidencia/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Incidencia/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var incidenciaSingleRoute = incidenciaCollectionRoute + '/:id';

  global.app.express
    .route(incidenciaSingleRoute)
    //.patch(require('./update'))
    .get(require('./show'))
    //.delete(require('./delete'));

  var incidenciaProfileRoute = '/v1/profile';

  global.app.express
    .route(incidenciaProfileRoute)
    /*.patch(function(req,res,next){
      //req.incidencia=req.loggedUser;
      return next();
    }, require('./update'))*/
};
