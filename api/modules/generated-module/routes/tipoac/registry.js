
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var tipoacHelpRoute = apiRoute + '/tipoac-help';
  global.app.express
    .route(tipoacHelpRoute)
    .get(require('./help'));

  var tipoacCollectionRoute = apiRoute + '/tipoac';

  global.app.express
    .route(tipoacCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .TipoAC
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.tipoac = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'TipoAC/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'TipoAC/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var tipoacSingleRoute = tipoacCollectionRoute + '/:id';

  global.app.express
    .route(tipoacSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var tipoacProfileRoute = '/v1/profile';

  global.app.express
    .route(tipoacProfileRoute)
    .patch(function(req,res,next){
      //req.tiponc=req.loggedUser;
      return next();
    }, require('./update'))
};
