
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var contactHelpRoute = apiRoute + '/contact-help';
  global.app.express
        .route(contactHelpRoute)
        .get(global.security.ensureAuthenticated(),require('./help'));

  var contactCollectionRoute = apiRoute + '/contact';

  global.app.express
        .route(contactCollectionRoute)
        .post(global.security.ensureAuthenticated(),require('./create'))
        .get(global.security.ensureAuthenticated(),require('./index'));

  global
    .app.express
    .param('contactId', function (req, res, next, contactId) {
        return models
          .Contact
          .findByPk(contactId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.contact = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Contact/:contactId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Contact/:contactId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var contactSingleRoute = contactCollectionRoute + '/:contactId';

  global.app.express
        .route(contactSingleRoute)
        .patch(global.security.ensureAuthenticated(),require('./update'))
        .get(global.security.ensureAuthenticated(),require('./show'))
        .delete(global.security.ensureAuthenticated(),require('./delete'));
};
