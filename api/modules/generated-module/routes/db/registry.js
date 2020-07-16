
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var dbHelpRoute = apiRoute + '/db-help';
  global.app.express
        .route(dbHelpRoute)
        .get(global.security.ensureAuthenticated(),require('./help'));

  var dbCollectionRoute = apiRoute + '/db';

  global.app.express
        .route(dbCollectionRoute)
        .post(global.security.ensureAuthenticated(),require('./create'))
        .get(global.security.ensureAuthenticated(),require('./index'));

  global
    .app.express
    .param('dbId', function (req, res, next, dbId) {
        return models
          .Db
          .findByPk(dbId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.db = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Db/:dbId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Db/:dbId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var dbSingleRoute = dbCollectionRoute + '/:dbId';

  global.app.express
        .route(dbSingleRoute)
        .patch(global.security.ensureAuthenticated(),require('./update'))
        .get(global.security.ensureAuthenticated(),require('./show'))
        .delete(global.security.ensureAuthenticated(),require('./delete'));
};
