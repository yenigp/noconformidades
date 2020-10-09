
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var agenciaviajesHelpRoute = apiRoute + '/agenciaviajes-help';
  global.app.express
    .route(agenciaviajesHelpRoute)
    .get(require('./help'));

  var agenciaviajesCollectionRoute = apiRoute + '/agenciaviajes';

  global.app.express
    .route(agenciaviajesCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .AgenciaViajes
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.agenciaviajes = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'AgenciaViajes/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'AgenciaViajes/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var agenciaviajesSingleRoute = agenciaviajesCollectionRoute + '/:id';

  global.app.express
    .route(agenciaviajesSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var agenciaviajesProfileRoute = '/v1/profile';

  global.app.express
    .route(agenciaviajesProfileRoute)
    .patch(function(req,res,next){
      //req.agenciaviajes=req.loggedUser;
      return next();
    }, require('./update'))
};
