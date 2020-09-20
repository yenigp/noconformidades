'use strict';

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;

  var jsonAPIBody = {
    data: {}
  };

  return req
    .pais
    .update(req.body)
    .then(function (data) {
      return models
        .Pais
        .findByPk(data.id, {include:[{all:true}]});
    })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'pais/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'pais/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};
