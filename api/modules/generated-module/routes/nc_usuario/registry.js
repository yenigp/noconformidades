
exports.registry = function registry() {
  var models = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI = global.app.utils.jsonAPI;

  var personHelpRoute = apiRoute + '/person-help';
  global.app.express
    .route(personHelpRoute)
    .get(global.security.ensureAuthenticated(), require('./help'));

  var personCollectionRoute = apiRoute + '/person';

  global.app.express
    .route(personCollectionRoute)
    .post(global.security.ensureAuthenticated(), require('./create'))
    .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('personId', function (req, res, next, personId) {
      return models
        .Person
        .findByPk(personId, {
          include: [{ all: true }]
        }).then(function (data) {
          if (!data) {
            return res.sendStatus(404); // Not Found.
          }

          req.person = data;
          return next();

        })
        .catch(global.app.orm.Sequelize.ValidationError, function (error) {
          global.app.logger.error(error, {
            module: 'Person/:personId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(400)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        })
        .catch(function (error) {
          global.app.logger.error(error, {
            module: 'Person/:personId',
            submodule: 'index',
            stack: error.stack
          });
          return res.status(500)
            .json(jsonAPI.processErrors(error, req, { file: __filename }));
        });
    }
    );

  var personSingleRoute = personCollectionRoute + '/:personId';

  global.app.express
    .route(personSingleRoute)
    .patch(global.security.ensureAuthenticated(), require('./update'))
    .get(global.security.ensureAuthenticated(), require('./show'))
    .delete(global.security.ensureAuthenticated(), require('./delete'));

  var personProfileRoute = '/v1/profile';

  global.app.express
    .route(personProfileRoute)
    .patch(global.security.ensureAuthenticated(),function(req,res,next){
      req.person=req.loggedUser;
      return next();
    }, require('./update'))
};
