
exports.registry = function registry() {
  var models   = global.app.orm.sequelize.models;
  var apiRoute = global.app.config.get('api:prefix');
  var jsonAPI  = global.app.utils.jsonAPI;

  var enterpriseHelpRoute = apiRoute + '/enterprise-help';
  global.app.express
        .route(enterpriseHelpRoute)
        .get(global.security.ensureAuthenticated(),require('./help'));

  var enterpriseCollectionRoute = apiRoute + '/enterprise';

  global.app.express
        .route(enterpriseCollectionRoute)
        .post(function(req,res,next){
          return next();
        },require('./create'))
        .get(global.security.ensureAuthenticated(),require('./index'));

  global
    .app.express
    .param('enterpriseId', function (req, res, next, enterpriseId) {
        return models
          .Enterprise
          .findByPk(enterpriseId, {
            include: [
              {
                model: models.Deploy,
                include:[
                  {
                    model: models.Project,
                    attributes:['name','type','id','git']
                  },
                  {
                    model: models.WebClient
                  }
                ]
              }
            ]
          }).then(function (data) {
            if (!data) {
              return res.sendStatus(404); // Not Found.
            }

            req.enterprise = data;
            return next();
            
          })
          .catch(global.app.orm.Sequelize.ValidationError, function (error) {
            global.app.logger.error(error, {
              module   : 'Enterprise/:enterpriseId',
              submodule: 'index',
              stack    : error.stack
            });
            return res.status(400)
               .json(jsonAPI.processErrors(error, req, {file:__filename}));
          })
          .catch(function (error) {
            global.app.logger.error(error, {
              module   : 'Enterprise/:enterpriseId',
              submodule: 'index',
              stack    : error.stack
            });
             return res.status(500)
                           .json(jsonAPI.processErrors(error, req, {file:__filename}));
          });
      }
    );

  var enterpriseSingleRoute = enterpriseCollectionRoute + '/:enterpriseId';

  global.app.express
        .route(enterpriseSingleRoute)
        .patch(global.security.ensureAuthenticated(),require('./update'))
        .get(global.security.ensureAuthenticated(),require('./show'))
        .delete(global.security.ensureAuthenticated(),require('./delete'));
};
