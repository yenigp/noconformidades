
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var projectHelpRoute = apiRoute + '/project-help';
  global.app.express
        .route(projectHelpRoute)
        .get(global.security.ensureAuthenticated(),require('./help'));

  var projectCollectionRoute = apiRoute + '/project';

  global.app.express
        .route(projectCollectionRoute)
        .post(global.security.ensureAuthenticated(),require('./create'))
        .get(global.security.ensureAuthenticated(),require('./index'));

  global
    .app.express
    .param('projectId', function (req, res, next, projectId) {
        return models
          .Project
          .findByPk(projectId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.project = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Project/:projectId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Project/:projectId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var projectSingleRoute = projectCollectionRoute + '/:projectId';

  global.app.express
        .route(projectSingleRoute)
        .patch(global.security.ensureAuthenticated(),require('./update'))
        .get(global.security.ensureAuthenticated(),require('./show'))
        .delete(global.security.ensureAuthenticated(),require('./delete'));
};
