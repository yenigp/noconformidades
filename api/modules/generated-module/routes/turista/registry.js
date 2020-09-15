
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var turistaHelpRoute = apiRoute + '/turista-help';
  global.app.express
    .route(turistaHelpRoute)
    .get(require('./help'));

  var turistaCollectionRoute = apiRoute + '/turista';

  global.app.express
    .route(turistaCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, idturista) {
      return models
        .Turista
        .findByPk(id, {
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
            module: 'Turista/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Turista/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var turistaSingleRoute = turistaCollectionRoute + '/:id';

  global.app.express
    .route(turistaSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var turistaProfileRoute = '/v1/profile';

  global.app.express
    .route(turistaProfileRoute)
    .patch(function(req,res,next){
      //req.turista=req.loggedUser;
      return next();
    }, require('./update'))
};
