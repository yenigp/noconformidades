'use strict';

module.exports = function (req, res) {

  var jsonAPI = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  var sequelize = global.app.orm.sequelize;
  var Sequelize=global.app.orm.Sequelize;
  var jsonAPIBody = {
    data: {}
  };

  return sequelize.transaction(function (t) {
    return req
      .deploy
      .update(req.body, {
        transaction: t
      }).then(function () {
        if (req.body.WebClients) {
          return models.WebClient.destroy({
            where: {
              DeployId: req.deploy.id
            },
            transaction: t
          }).then(function () {
            return Sequelize.Promise.mapSeries(req.body.WebClients, function (item) {
              item.DeployId= req.deploy.id;
              item.EnterpriseId= req.deploy.EnterpriseId;
              item.ProjectId= req.deploy.ProjectId;
              if (item.username||item.rol||item.cipheredPass||item.description){
                return models.WebClient.create(item, { transaction: t })
              }
            })
          })
        }
      })
  }).then(function (data) {
    return models
      .Deploy
      .findByPk(req.deploy.id);
  })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module: 'deploy/update',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(400)
        .json(jsonAPI.processErrors(error, req, { file: __filename }));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module: 'deploy/update',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(500)
        .json(jsonAPI.processErrors(error, req, { file: __filename }));
    });
};

