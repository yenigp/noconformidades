'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(req, res) {
  var models = global.app.orm.sequelize.models;
  var jsonAPIBody = {
    data: []
  }
  return global
    .app.orm.sequelize.transaction(function(t) {
      return models
        .VerificationItem
        .findOne({
          where: {
            code: req.body.code.trim(),
            email: req.body.email.trim()
          }
        })
        .then(function(data) {
          if (!data) {
            throw new global.app.orm.Sequelize.ValidationError(null, [
              new global.app.orm.Sequelize.ValidationErrorItem('The provided code did not matched any item.', null, 'isValidCode')
            ]);
          }


          return models.Usuario.findOne({
            where: {
              email: req.body.email
            },
            hooks: false,
            individualHooks: false
          });
        }).then(function(usuario) {
          if (!usuario) {
            throw new global.app.orm.Sequelize.ValidationError(null, [
              new global.app.orm.Sequelize.ValidationErrorItem('User not found', null, 'deletedUser')
            ]);
          }
          jsonAPIBody.data = usuario;
          return usuario
            .update({
              status: "enabled"
            })
        })
        .then(function() {
          return models
            .VerificationItem
            .destroy({
              force: true,
              where: {
                code: req.body.code,
                email: req.body.email
              }
            });
        });
    })
    .then(function() {


      var usuarioData = {
        id: jsonAPIBody.data.dataValues.id,
        username: jsonAPIBody.data.dataValues.username,
        email: jsonAPIBody.data.dataValues.email,
        date: new Date()

      };
      var jwtSignature = jwt.sign({
        data: usuarioData
      }, global.app.config.get('jwt:secret'), {
        expiresIn: '24h'
      });
      return res.status(200).json({
        data: {
          Authorization: 'Bearer ' + jwtSignature,
          profile: jsonAPIBody.data
        }
      }); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function(error) {
      global.app.logger.error(error, {
        module: 'auth/validate',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(400)
        .json(jsonAPI.processErrors(error, req, {
          file: __filename
        }));
    })
    .catch(function(error) {
      global.app.logger.error(error, {
        module: 'auth/validate',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(500)
        .json(jsonAPI.processErrors(error, req, {
          file: __filename
        }));
    });
};