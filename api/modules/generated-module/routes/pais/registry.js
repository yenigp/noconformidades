
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var paisHelpRoute = apiRoute + '/pais-help';
  global.app.express
    .route(paisHelpRoute)
    .get(require('./help'));

  var paisCollectionRoute = apiRoute + '/pais';

  global.app.express
    .route(paisCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('paisId', function (req, res, next, paisId) {
      return models
        .Pais
        .findByPk(paisId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.pais = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Pais/:paisId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Pais/:paisId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var paisSingleRoute = paisCollectionRoute + '/:paisId';

  global.app.express
    .route(paisSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  /*var paisProfileRoute = '/v1/profile';

  global.app.express
    .route(paisProfileRoute)
    .patch(function(req,res,next){
      req.pais=req.loggedUser;
      return next();
    }, require('./update'))*/
};
