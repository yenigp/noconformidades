/**
 * Created by zxc on 26/03/18.
 */
'use strict';
var jwt = require('jsonwebtoken');
var lodash = require('lodash');
module.exports = function(req, res) {
  var models = global.app.orm.sequelize.models;
  /**
   * si lo que viene en el authorization empieza con Basic
   * devolvemos el Bearer
   * */
  if (req.header('Authorization') && req.header('Authorization')
    .startsWith('Basic')) {
    /**
     * viene username y password en base 64 separados por :
     *
     * */
    var usernamePassword = new Buffer.from(req.header('Authorization')
        .split('Basic ')[1], 'base64').toString()
      .split(':');
    console.log(usernamePassword);

    return findUser(usernamePassword[0])
      .then(function(usuario) {
        if (!usuario) {
          return res.status(401)
            .json({
              errors: [{
                field: 'User',
                title: 'User not found'
              }]
            }); //user not found
        }
        if (!usuario.isValidPassword(usernamePassword[1])) {
          return res.status(401)
            .json({
              errors: [{
                field: 'password',
                title: 'Wrong password'
              }]
            });
        }
        if (usuario.status != 'enabled') {
          return res.status(401)
            .json({
              errors: [{
                field: 'status',
                title: 'User not enabled'
              }]
            });
        }



        var usuarioData = {
          id: usuario.dataValues.id,
          username: usuario.dataValues.username,
          lastLogout: usuario.dataValues.lastLogout,
          date: new Date(),
          createdAt: usuario.dataValues.createdAt,
          updatedAt: usuario.dataValues.updatedAt,
          random: Math.random()
        };

        req.tokenLifeTime = 600;
        req.loggedUser = usuario;

        var jwtSignature = jwt.sign({
          data: usuarioData
        }, global.app.config.get('jwt:secret'), {
          expiresIn: '10h'
        });

        var usuarioResult = lodash.cloneDeep(usuario)
        delete usuarioResult.dataValues.password;
        return res.status(200).json({
          data: {
            Authorization: 'Bearer ' + jwtSignature,
            profile: usuarioResult
          }
        });



      })
  } else if (req.header('Authorization') && req.header('Authorization')
    .startsWith('Bearer')) {
    /**
     * verificar si viene Bearer
     *
     * */
    jwt.verify(req.header('Authorization')
      .split('Bearer ')[1], global.app.config.get('jwt:secret'),
      function(err,
        decoded) {
        if (err) {
          /**
           * error al procesar el token, es falso
           * */
          return res.status(401)
            .json({
              errors: [{
                field: 'authorization',
                title: 'Invalid bearer authorization'
              }]
            });
        } else {
          if (decoded.iat > decoded.exp) {
            /**
             * el token ha expirado, logueese de nuevo
             * */
            return res.status(401)
              .json({
                field: 'authorization',
                title: 'Authorization has expired'
              });
          }
          return findUser(decoded.data.username)
            .then(function(usuario) {
              if (!usuario) {
                return res.status(401)
                  .json({
                    errors: [{
                      field: 'User',
                      title: 'User not found'
                    }]
                  })
              }

              if (usuario.status != 'enabled') {
                return res.status(401)
                  .json({
                    errors: [{
                      field: 'status',
                      title: 'User not enabled'
                    }]
                  });
              }
              var jwtSignature = jwt.sign({
                data: {
                  id: usuario.dataValues.id,
                  username: usuario.dataValues.username,
                  lastLogout: usuario.dataValues.lastLogout,
                  createdAt: usuario.dataValues.createdAt,
                  updatedAt: usuario.dataValues.updatedAt,
                  date: new Date(),
                  random: Math.random()
                }
              }, global.app.config.get('jwt:secret'), {
                expiresIn: '24h'
              });

              req.tokenLifeTime = 1440;
              req.loggedUser = usuario;
              var usuarioResult = lodash.cloneDeep(usuario)
              delete usuarioResult.dataValues.password;
              return res.status(200).json({
                data: {
                  Authorization: 'Bearer ' + jwtSignature,
                  profile: usuarioResult
                }
              });
            });
        }
      })

  } else {
    /**
     * Forma de logueo desconocida
     * */
    return res.status(401)
      .json({
        errors: [{
          field: 'authentication',
          title: 'Not valid autentication'
        }]
      });

  }
};

function findUser(username) {
  console.log('checking');
  var models = global.app.orm.sequelize.models;
  return models
    .Usuario.findOne({
      where: {
        usuario: username
      }
    })
}