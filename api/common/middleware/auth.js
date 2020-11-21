/**
 * Created by zxc on 30/03/18.
 */

var jwt = require('jsonwebtoken');
var moment = require('moment');
const { model } = require('mongoose');
const area = require('../../modules/generated-module/routes/area');
const sucursal = require('../../modules/generated-module/routes/sucursal');
exports.ensureAuthenticated = ensureAuthenticated;
exports.basicCheckUser = basicCheckUser;
exports.basicStrategyVerifyCallback = basicStrategyVerifyCallback;
exports.ensureHasPermission = ensureHasPermission;
exports.getPermissionsByUserId = getPermissionsByUserId;
exports.isUsuario = isUsuario;
exports.isAuditor = isAuditor;
exports.isJefeProceso = isJefeProceso;
exports.isSuperAdmin = isSuperAdmin;
exports.isAdmin = isAdmin;
exports.isEspRRHH = isEspRRHH;
exports.isEspCalidadSucursal = isEspCalidadSucursal;
exports.isEspCalidadEmpresa = isEspCalidadEmpresa;
exports.isSupervisor = isSupervisor;
exports.isDirectorSucursal = isDirectorSucursal;
exports.ensureSucursal = ensureSucursal;
exports.ensureUsuario = ensureUsuario;

/**
 * Verificando autenticación
 */
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

          return  models.Usuario.findByPk(
            decoded.data.id,
            {
              include: [
                {
                model: models.Sucursal,
                as:'Sucursal'
                },
                {
                  model: models.Roles,
                  as:'Role'
                }
            ]
            }
          ).then(async function(user) {
            if (!user) {
              return res.status(401).json({
                errors: [{
                  field: "usuario",
                  title: "el usuario no existe"
                }]
              })
            }
            if (user.dataValues.status != undefined && user.dataValues.status !== 'enabled') {
              return res.status(401).json({
                errors: [{
                  field: "usuario",
                  title: "el usuario está desabilitado"
                }]
              })
            }

            var tokenlastLogout = moment(decoded.data.lastLogout);
            var usuariolastLogout = moment(user.dataValues.lastLogout);

            if (decoded.data.lastLogout == undefined) {
              return res.status(401).json({
                errors: [{
                  field: "Authorization",
                  title: "old token provided v2."
                }]
              })
            }

            if (usuariolastLogout.diff(tokenlastLogout, 'seconds') > 0) {
              return res.status(401).json({
                errors: [{
                  field: "Authorization",
                  title: "old token provided"
                }]
              })
            } else {
              req.loggedUser = user;
              console.log(req.loggedUser.Sucursal.nombagenciaviajes)
              console.log(req.loggedUser.Role.nombre)
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

/**
 * Veridicando si el usuario se va a eliminar él mismo
 */
function ensureUsuario(){
  models = global.app.orm.sequelize.models;

  return function(req, res, next) {
    console.log(req.params.usuarioId)
    models.Usuario.findByPk(req.params.usuarioId)
    .then(function (userX) {
      if (userX.id !== req.loggedUser.id){
        return next();
      }
      else {
        return res.status(403).json({
          errors: [{
            field: "Denegado",
            title: "Usted no se puede eliminar así mismo"
          }]
        })
      }
    }) 
  }
}


/**
 * Verificando la Sucursal o si su rol es SuperAdmin
 */
function ensureSucursal() {
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {
      if (req.body.SucursalId == req.loggedUser.SucursalId){
        return next();
      }else if (req.loggedUser.RolId == 4) {
        return next();
      }
      else {
        return res.status(403).json({
          errors: [{
            field: "Autorización",
            title: "Usted no tiene permiso para gestionar usuarios de esta Sucursal"
          }]
        })
      }
    }
  }

/**
 * Verificando si el rol del usuario es Administrador de Sucursal
 */
function isAdmin(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "AdminSucursal" || "AdminEmpresa"}
        })
      }).then(function(isAdminSucursalX) {
        console.log(isAdminSucursalX)
        if (!isAdminSucursalX) {
          return res.status(403).json({
            errors: [{
              field: "Autenticación",
              title: "Su usuario no es Administrador"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario se Administrador de Empresa
 */
function isEspRRHH(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "EspRRHH"}
        })
      }).then(function(isEspRRHHX) {
        if (!isEspRRHHX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificiando si el rol del usuario es Usuario
 */
function isUsuario(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "Usuario"}
        })
      }).then(function(isUsuarioX) {
        if (!isUsuarioX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario es Auditor
 */
function isAuditor(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "Auditor"}
        })
      }).then(function(isAuditorX) {
        if (!isAuditorX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario es Jefe de Proceso
 */
function isJefeProceso(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "JefeProceso"}
        })
      }).then(function(isJefeProcesoX) {
        if (!isJefeProcesoX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario es SuperAdmin
 */
function isSuperAdmin(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "SuperAdmin"}
        })
      }).then(function(isSuperAdminX) {
        if (!isSuperAdminX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario es EspCalidadSucursal
 */
function isEspCalidadSucursal(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "EspCalidadSucursal"}
        })
      }).then(function(isEspCalidadSucursalX) {
        if (!isEspCalidadSucursalX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario es EspCalidadEmpresa
 */
function isEspCalidadEmpresa(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "EspCalidadEmpresa"}
        })
      }).then(function(isEspCalidadEmpresaX) {
        if (!isEspCalidadEmpresaX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del usuario es Supervisor
 */
function isSupervisor(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "Supervisor"}
        })
      }).then(function(isSupervisorX) {
        if (!isSupervisorX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}

/**
 * Verificando que el rol del Usuario es DirectorSucursal
 */
function isDirectorSucursal(){
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;

        return models.Roles.findOne({
          where: {id: rol, nombre: "DirectorSucursal"}
        })
      }).then(function(isDirectorSucursalX) {
        if (!isDirectorSucursalX) {
          return res.status(403).json({
            errors: [{
              field: "Autorización",
              title: "Acceso no autorizado"
            }]
          })
        } else {
          return next();
        }
      })
  }
}


function ensureHasPermission(permisoId) {
  var models = global.app.orm.sequelize.models;
  return function(req, res, next) {
    var method = req.method.toLowerCase();

    return models.Usuario.findByPk(req.loggedUser.id)
      .then(function(usuarioX) {
        var rol = usuarioX.RolId;
        console.log(rol, permisoId)

      return models.RolPermiso.findOne({
        where: {
          RolId: {
            [global.app.orm.Sequelize.Op.in]: rol
          },
          PermisoId: permisoId,
          [method]: 1
        }
      })
    }).then(function(rolPermisoX) {
      console.log(rolPermisoX)
      if (!rolPermisoX) {
        return res.status(403).json({
          errors: [{
            field: "Autenticación",
            title: "Su usuario no tiene ningún permiso"
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
    .Usuario
    .findOne({
      where: {
        usuario: username,
        status: enabled
      }
    })
    .then(function(usuario) {
      if (!usuario) {
        done(null, false);
        return null;
      }
      if (!usuario.isValidPassword(password)) {
        done(null, false);
        return null;
      }
      done(null, usuario);
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

        return global.app.orm.sequelize.models.Usuario.findByPk(
          decoded.data.id
        ).then(function(user) {

          if (!user) {
            console.log('Usuario no existeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            return done({
              status: 401,
              key: 'usuario',
              message: 'usuario no encontrado'
            }, null);
          }
          if (user.dataValues.usuario != decoded.data.username) {
            console.log('Usuario de otra api');
            return done({
              status: 401,
              key: 'usuario',
              message: 'usuario no encontrado :('
            }, null);
          }

          if (user.dataValues.status !== 'enabled') {
            console.log('usuario deshabilitadooooooooooooooooooooooooooooooooo');
            return done({
              status: 401,
              key: 'usuario',
              message: 'el usuario está deshabilitado'
            }, null);

          }
          var usuariolastLogout = moment(user.dataValues.lastLogout);
          if (decoded.data.lastLogout == undefined) {
            return done({
              status: 401,
              key: 'authorization',
              message: 'old token provided v2.'
            }, null);
          }

          console.log('cant ', usuariolastLogout.diff(tokenlastLogout, 'seconds'));
          if (usuariolastLogout.diff(tokenlastLogout, 'seconds') > 0) {
            return done({
              status: 401,
              key: 'authorization',
              message: 'old token provided v2.'
            }, null);
          } else {
            /**
             * si la ultima vez que se logueo el usuario
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
  return models.Usuario.findByPk(UserId)
  .then(function(usuarioX) {
    var rol = usuarioX.RolId;

      return models.RolPermiso.findAll({
        where: {
          RolId: {
            $in: rol
          }
        },
        include: [{
          model: models.Permisos,
          as: 'Permisos',
          attributes: ["nombre"]
        }],
        raw: true,
        attributes: ["PermisoId", "canGet", "canPost", "canPatch", 'canDelete', "canSee"]
      });
  }).then(function(RolPermiso) {
    var permiso = {}
    var PermisoId = 0;
    var permisoList = [];
    for (var i = 0; i < RolPermiso.length; i++) {
      PermisoId = RolPermiso[i]['Permiso.nombre'];
      if (permiso[PermisoId] == undefined) {
        permisoList.push
        permiso[PermisoId] = {
          canGet: RolPermiso[i].canGet,
          canPost: RolPermiso[i].canPost,
          canPatch: RolPermiso[i].canPatch,
          canDelete: RolPermiso[i].canDelete,
          canSee: RolPermiso[i].canSee,
        }
      } else {
        permiso[PermisoId].canGet = permiso[PermisoId].canGet || RolPermiso[id].canGet;
        permiso[PermisoId].canPatch = permiso[PermisoId].canPatch || RolPermiso[i].canPatch;
        permiso[PermisoId].canSee = permiso[PermisoId].canSee || RolPermiso[i].canSee;
        permiso[PermisoId].canPost = permiso[PermisoId].canPost || RolPermiso[i].canPost;
        permiso[PermisonId].canDelete = permiso[PermisoId].canDelete || RolPermiso[i].canDelete;
      }
    }
    return permiso;
  })

}