
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var reservaHelpRoute = apiRoute + '/reserva-help';
  global.app.express
    .route(reservaHelpRoute)
    .get(require('./help'));

  var reservaCollectionRoute = apiRoute + '/reserva';

  global.app.express
    .route(reservaCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .Reserva
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.reserva = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Reserva/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Reserva/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var reservaSingleRoute = reservaCollectionRoute + '/:id';

  global.app.express
    .route(reservaSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var reservaProfileRoute = '/v1/profile';

  global.app.express
    .route(reservaProfileRoute)
    .patch(function(req,res,next){
      //req.reserva=req.loggedUser;
      return next();
    }, require('./update'))
};
