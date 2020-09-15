
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var sucursalHelpRoute = apiRoute + '/sucursal-help';
  global.app.express
    .route(sucursalHelpRoute)
    .get(require('./help'));

  var sucursalCollectionRoute = apiRoute + '/sucursal';

  global.app.express
    .route(sucursalCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .Sucursal
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.sucursal = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Sucursal/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Sucursal/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var sucursalSingleRoute = sucursalCollectionRoute + '/:id';

  global.app.express
    .route(sucursalSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var sucursalProfileRoute = '/v1/profile';

  global.app.express
    .route(sucursalProfileRoute)
    .patch(function(req,res,next){
      //req.sucursal=req.loggedUser;
      return next();
    }, require('./update'))
};
