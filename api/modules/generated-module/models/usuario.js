'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Usuario = global.app.orm.sequelize.define('Usuario',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "len":{
                    "args": [2,20],
                    "msg": "El nombre debe tener como mínimo 2 carácteres"
                  },
                }
            },
            "apellidos": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "max":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
            },
            "email": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "unique": true,
                "validate":{
                  "isEmail": {
                      "msg": "El email debe ser válido"
                  },
                  "notNull": {
                    "msg": "Por favor, registre el correo electrónico"
                },
                  isUnique(value) {
                    return Usuario.findOne({
                    where: {email:value}
                    }).then((email) => {
                     if (email) {throw new Error('Error: el correo' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                   }
                },
            },
            "usuario": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "unique": true,
                "validate":{
                  "max": 10,
                  "notNull": {
                    "msg": "Por favor, registre el nombre de usuario"
                },
                  isUnique(value) {
                    return Usuario.findOne({
                    where: {usuario:value}
                    }).then((usuario) => {
                    if (usuario) {throw new Error('Error: el usuario' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                }
              }
            },
            "password": {
                "type": global.app.orm.Sequelize.STRING,
                "validate": {
                    "len": {
                        "args": [8, 255],
                        "msg": "La contraseña debe tener como mínimo 8 carácteres" 
                    }
                },
                set: function(password) {
                    var rounds = 8;
                    var hashedpassword = bcrypt.hashSync(password, rounds);
                    this.setDataValue('password', hashedpassword);
                }

            },
            "status": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["enabled", "blocked"],
                "defaultValue": "enabled"
            },
            "lastLogout": {
                "type": global.app.orm.Sequelize.STRING

            },
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "RolId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Roles",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            },
            "CreatorId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Usuario",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            },
            "SucursalId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "comment": "The foreing object that will have the Usuario.",
                "allowNull": false,
                "noUpdate": true
      
            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Usuario',
            hooks: {

            }
        });
    Usuario.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Usuario.belongsTo(models.Usuario, {
            as: 'Creator'
        });
        models.Usuario.belongsTo(models.Sucursal, {
            foreignKey: 'SucursalId',
            constraints: false
        });

        models.Usuario.belongsTo(models.Roles, {
            foreignKey: 'RolId'
        });
    }

    Usuario.prototype.isValidPassword = function(password) {
        var hashedPassword = this.get('password');
        return bcrypt.compareSync(password, hashedPassword);
    }

};