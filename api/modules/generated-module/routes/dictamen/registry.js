
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var dictamenHelpRoute = apiRoute + '/dictamen-help';
  global.app.express
        .route(dictamenHelpRoute)
        .get(require('./help'));

  var dictamenCollectionRoute = apiRoute + '/dictamen';

  global.app.express
        .route(dictamenCollectionRoute)
        .post(global.security.ensureAuthenticated(), require('./create'))
        .get(global.security.ensureAuthenticated(), require('./index'));

  global
    .app.express
    .param('dictamenId', function (req, res, next, dictamenId) {
        return models
          .Dictamen
          .findByPk(dictamenId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.dictamen = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Dictamen/:dictamenId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Dictamen/:dictamenId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var dictamenSingleRoute = dictamenCollectionRoute + '/:dictamenId';

  global.app.express
        .route(dictamenSingleRoute)
        .patch(global.security.ensureAuthenticated(), require('./update'))
        .get(global.security.ensureAuthenticated(), require('./show'))
        .delete([global.security.ensureAuthenticated(), global.security.isJefeProceso()], require('./delete'));
};
