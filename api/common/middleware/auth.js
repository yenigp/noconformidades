/**
 * Created by zxc on 30/03/18.
 */

var jwt = require('jsonwebtoken');
var moment = require('moment');
exports.ensureAuthenticated = ensureAuthenticated;
exports.basicCheckUser = basicCheckUser;
exports.basicStrategyVerifyCallback = basicStrategyVerifyCallback;
exports.ensureHasPermission = ensureHasPermission;
exports.getPermissionsByUserId = getPermissionsByUserId;

function ensureAuthenticated() {
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {
    var bearer = "";
    try {
      bearer = req.header('Authorization')
        .split('Bearer ')[1];
    } catch (e) {
      return res.status(401).json({
        errors: [{
          field: "Authentication",
          title: "Bad authentication"
        }]
      })
    };

    jwt.verify(bearer, global.app.config.get('jwt:secret'), {
        ignoreExpiration: true
      },
      function(err,
        decoded) {
        if (err) {
          console.log(err);
          return res.status(401)
            .json({
              errors: [{
                field: 'authorization',
                title: 'Invalid bearer authorization'
              }]
            });
        } else {

          return models.Person.findByPk(
            decoded.data.id
          ).then(function(user) {
            if (!user) {
              return res.status(401).json({
                errors: [{
                  field: "user",
                  title: "user not found"
                }]
              })
            }
            if (user.dataValues.status != undefined && user.dataValues.status !== 'enabled') {
              return res.status(401).json({
                errors: [{
                  field: "user",
                  title: "user is disabled"
                }]
              })
            }

            var tokenlastLogout = moment(decoded.data.lastLogout);
            var personlastLogout = moment(user.dataValues.lastLogout);

            if (decoded.data.lastLogout == undefined) {
              return res.status(401).json({
                errors: [{
                  field: "Authorization",
                  title: "old token provided v2."
                }]
              })
            }

            if (personlastLogout.diff(tokenlastLogout, 'seconds') > 0) {
              return res.status(401).json({
                errors: [{
                  field: "Authorization",
                  title: "old token provided"
                }]
              })
            } else {
              req.loggedUser = user;
              return next();
            }
          }).catch(function(e) {
            console.log(e);
            return res.status(401).json({
              errors: [{
                field: "Authorization",
                title: e.message
              }]
            });
          })
        }
      })
  }
}



function ensureHasPermission(permissionId) {
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {
    var method = req.method.toLowerCase();

    return models.RolePerson.findAll({
      where: {
        PersonId: req.loggedUser.id
      },
      raw: true,
      logging: console.log,
      attributes: ["RoleId"]
    }).then(function(roles) {
      var listRoleId = roles.map(function(item) {
        return item.RoleId;
      });
      return models.RolePermission.findOne({
        where: {
          RoleId: {
            [global.app.orm.Sequelize.Op.in]: listRoleId
          },
          PermissionId: permissionId,
          [method]: 1
        }
      })
    }).then(function(rolePermissionX) {
      if (!rolePermissionX) {
        return res.status(403).json({
          errors: [{
            field: "Authentication",
            title: "Your user dont have enough permissions"
          }]
        })
      } else {
        return next();
      }
    })
  }
}



function basicStrategyVerifyCallback(username,
  password,
  done) {
  var models = global.app.orm.sequelize.models;
  if (typeof done != 'function') {
    return;
  }
  return models
    .Person
    .findOne({
      where: {
        gitUser: username,
        status: enabled
      }
    })
    .then(function(person) {
      if (!person) {
        done(null, false);
        return null;
      }
      if (!person.isValidPassword(password)) {
        done(null, false);
        return null;
      }
      done(null, person);
    })
}

function basicCheckUser(bearer, done) {

  jwt.verify(bearer, global.app.config.get('jwt:secret'), {
      ignoreExpiration: true
    },
    function(err,
      decoded) {
      if (err) {
        console.log(err);
        /**
         * error al procesar el token, es falso
         * */
        return done({
          status: 401,
          key: 'authorization',
          message: 'Invalid bearer authorization'
        }, null);
      } else {

        return global.app.orm.sequelize.models.Person.findByPk(
          decoded.data.id
        ).then(function(user) {

          if (!user) {
            console.log('Usuario no existeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            return done({
              status: 401,
              key: 'user',
              message: 'user not found'
            }, null);
          }
          if (user.dataValues.gitUser != decoded.data.username) {
            console.log('Usuario de otra api');
            return done({
              status: 401,
              key: 'user',
              message: 'user not found :('
            }, null);
          }

          if (user.dataValues.status !== 'enabled') {
            console.log('user disableddddddddddddddddddddddddddddddddd');
            return done({
              status: 401,
              key: 'user',
              message: 'user is disabled'
            }, null);

          }
          var personlastLogout = moment(user.dataValues.lastLogout);
          if (decoded.data.lastLogout == undefined) {
            return done({
              status: 401,
              key: 'authorization',
              message: 'old token provided v2.'
            }, null);
          }

          console.log('cant ', personlastLogout.diff(tokenlastLogout, 'seconds'));
          if (personlastLogout.diff(tokenlastLogout, 'seconds') > 0) {
            return done({
              status: 401,
              key: 'authorization',
              message: 'old token provided v2.'
            }, null);
          } else {
            /**
             * si la ultima vez que se logueo la persona
             * */
            return done(
              null, user);

          }
        }).catch(function(e) {
          return done({
            status: 401,
            key: 'error',
            message: e.message
          }, null);
        })
      }
    }
  )

}




/**
 * devuelve el listado de permisos de un usuario especifico
 * 
 * @param {Integer} UserId
 *  
 */
function getPermissionsByUserId(UserId) {
  console.log(UserId)
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;
  return models.RolePerson.findAll({
    where: {
      PersonId: UserId
    },
    attributes: ["RoleId"],
    raw: true
  }).then(function(roles) {
    {
      var items = roles.map(function(item) {
        return item.RoleId
      });

      return models.RolePermission.findAll({
        where: {
          RoleId: {
            $in: items
          }
        },
        include: [{
          model: models.Permission,
          as: 'Permission',
          attributes: ["name"]
        }],
        raw: true,
        attributes: ["PermissionId", "canGet", "canPost", "canPatch", 'canDelete', "canSee"]
      });
    }
  }).then(function(RolePermission) {
    var permissions = {}
    var PermissionId = 0;
    var permissionList = [];
    for (var i = 0; i < RolePermission.length; i++) {
      PermissionId = RolePermission[i]['Permission.name'];
      if (permissions[PermissionId] == undefined) {
        permissionList.push
        permissions[PermissionId] = {
          canGet: RolePermission[i].canGet,
          canPost: RolePermission[i].canPost,
          canPatch: RolePermission[i].canPatch,
          canDelete: RolePermission[i].canDelete,
          canSee: RolePermission[i].canSee,
        }
      } else {
        permissions[PermissionId].canGet = permissions[PermissionId].canGet || RolePermission[id].canGet;
        permissions[PermissionId].canPatch = permissions[PermissionId].canPatch || RolePermission[i].canPatch;
        permissions[PermissionId].canSee = permissions[PermissionId].canSee || RolePermission[i].canSee;
        permissions[PermissionId].canPost = permissions[PermissionId].canPost || RolePermission[i].canPost;
        permissions[PermissionId].canDelete = permissions[PermissionId].canDelete || RolePermission[i].canDelete;
      }
    }
    return permissions;
  })

}