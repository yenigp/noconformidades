
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var mercadoHelpRoute = apiRoute + '/mercado-help';
  global.app.express
    .route(mercadoHelpRoute)
    .get(require('./help'));

  var mercadoCollectionRoute = apiRoute + '/mercado';

  global.app.express
    .route(mercadoCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .Mercado
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.mercado = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Mercado/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Mercado/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var mercadoSingleRoute = mercadoCollectionRoute + '/:id';

  global.app.express
    .route(mercadoSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var mercadoProfileRoute = '/v1/profile';

  global.app.express
    .route(mercadoProfileRoute)
    .patch(function(req,res,next){
      //req.mercado=req.loggedUser;
      return next();
    }, require('./update'))
};
