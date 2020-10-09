
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  /*var auditoriaHelpRoute = apiRoute + '/auditoria-help';
  global.app.express
    .route(auditoriaHelpRoute)
    .get(require('./help'));*/

  var auditoriaCollectionRoute = apiRoute + '/auditoria';

  global.app.express
    .route(auditoriaCollectionRoute)
    //.post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .Auditoria
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.auditoria = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Auditoria/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Auditoria/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var auditoriaSingleRoute = auditoriaCollectionRoute + '/:id';

  global.app.express
    .route(auditoriaSingleRoute)
    //.patch(require('./update'))
    .get(require('./show'))
    //.delete(require('./delete'));

  var auditoriaProfileRoute = '/v1/profile';

  global.app.express
    .route(auditoriaProfileRoute)
    /*.patch(function(req,res,next){
      //req.auditoria=req.loggedUser;
      return next();
    }, require('./update'))*/
};
