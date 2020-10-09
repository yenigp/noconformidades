
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var procesoHelpRoute = apiRoute + '/proceso-help';
  global.app.express
    .route(procesoHelpRoute)
    .get(require('./help'));

  var procesoCollectionRoute = apiRoute + '/proceso';

  global.app.express
    .route(procesoCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .Proceso
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.proceso = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Proceso/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Proceso/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var procesoSingleRoute = procesoCollectionRoute + '/:id';

  global.app.express
    .route(procesoSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var procesoProfileRoute = '/v1/profile';

  global.app.express
    .route(procesoProfileRoute)
    .patch(function(req,res,next){
      //req.norma=req.loggedUser;
      return next();
    }, require('./update'))
};
