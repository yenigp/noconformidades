
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var prodservicioHelpRoute = apiRoute + '/prodservicio-help';
  global.app.express
    .route(prodservicioHelpRoute)
    .get(require('./help'));

  var prodservicioCollectionRoute = apiRoute + '/prodservicio';

  global.app.express
    .route(prodservicioCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .ProdServicio
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.prodservicio = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'ProdServicio/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'ProdServicio/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var prodservicioSingleRoute = prodservicioCollectionRoute + '/:id';

  global.app.express
    .route(prodservicioSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var prodservicioProfileRoute = '/v1/profile';

  global.app.express
    .route(prodservicioProfileRoute)
    .patch(function(req,res,next){
      //req.prodservicio=req.loggedUser;
      return next();
    }, require('./update'))
};
