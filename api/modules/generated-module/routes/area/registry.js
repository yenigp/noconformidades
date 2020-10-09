
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var areaHelpRoute = apiRoute + '/area-help';
  global.app.express
        .route(areaHelpRoute)
        .get(require('./help'));

  var areaCollectionRoute = apiRoute + '/area';

  global.app.express
        .route(areaCollectionRoute)
        .post(require('./create'))
        .get(require('./index'));

  global
    .app.express
    .param('areaId', function (req, res, next, areaId) {
        return models
          .Area
          .findByPk(areaId, {
            include: [{all: true}]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.area = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Area/:areaId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Area/:areaId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var areaSingleRoute = areaCollectionRoute + '/:areaId';

  global.app.express
        .route(areaSingleRoute)
        .patch(require('./update'))
        .get(require('./show'))
        .delete(require('./delete'));
};
