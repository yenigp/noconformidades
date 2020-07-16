
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var deployHelpRoute = apiRoute + '/deploy-help';
  global.app.express
        .route(deployHelpRoute)
        .get(global.security.ensureAuthenticated(),require('./help'));

  var deployCollectionRoute = apiRoute + '/deploy';

  global.app.express
        .route(deployCollectionRoute)
        .post(global.security.ensureAuthenticated(),require('./create'))
        .get(global.security.ensureAuthenticated(),require('./index'));

  global
    .app.express
    .param('deployId', function (req, res, next, deployId) {
        return models
          .Deploy
          .findByPk(deployId, {
            include: [
              {
                model: models.WebClient
              },
              {
                model: models.Enterprise
              },
              {
                model: models.Project
              },
            ]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.deploy = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Deploy/:deployId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Deploy/:deployId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var deploySingleRoute = deployCollectionRoute + '/:deployId';

  global.app.express
        .route(deploySingleRoute)
        .patch(global.security.ensureAuthenticated(),require('./update'))
        .get(global.security.ensureAuthenticated(),require('./show'))
        .delete(global.security.ensureAuthenticated(),require('./delete'));
};
