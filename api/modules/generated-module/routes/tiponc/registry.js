
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var tiponcHelpRoute = apiRoute + '/tiponc-help';
  global.app.express
    .route(tiponcHelpRoute)
    .get(require('./help'));

  var tiponcCollectionRoute = apiRoute + '/tiponc';

  global.app.express
    .route(tiponcCollectionRoute)
    .post(require('./create'))
    .get(require('./index'));

  global
    .app.express
    .param('id', function (req, res, next, id) {
      return models
        .TipoNC
        .findByPk(id, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.tiponc = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'TipoNC/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'TipoNC/:id',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var tiponcSingleRoute = tiponcCollectionRoute + '/:id';

  global.app.express
    .route(tiponcSingleRoute)
    .patch(require('./update'))
    .get(require('./show'))
    .delete(require('./delete'));

  var tiponcProfileRoute = '/v1/profile';

  global.app.express
    .route(tiponcProfileRoute)
    .patch(function(req,res,next){
      //req.tiponc=req.loggedUser;
      return next();
    }, require('./update'))
};
