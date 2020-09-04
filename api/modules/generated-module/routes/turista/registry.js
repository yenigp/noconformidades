
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var turistaHelpRoute = apiRoute + '/turista-help';
  global.app.express
    .route(turistaHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var turistaCollectionRoute = apiRoute + '/turista';

  global.app.express
    .route(turistaCollectionRoute)
    .post(global.security.ensureAuthenticated(), require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('idturista', function (req, res, next, idturista) {
      return models
        .Turista
        .findByPk(idturista, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.turista = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Turista/:idturista',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Turista/:idturista',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var turistaSingleRoute = turistaCollectionRoute + '/:idturista';

  global.app.express
    .route(turistaSingleRoute)
    .patch(global.security.ensureAuthenticated(), require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete(global.security.ensureAuthenticated(), require('./delete'));

  var turistaProfileRoute = '/v1/profile';

  global.app.express
    .route(turistaProfileRoute)
    .patch(global.security.ensureAuthenticated(),function(req,res,next){
      req.turista=req.loggedUser;
      return next();
    }, require('./update'))
};
