'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const NCUsuario = global.app.orm.sequelize.define('NCUsuario',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "cargo_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Cargo",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "uuid": {
                "type": global.app.orm.Sequelize.UUID,
                "defaultValue": global.app.orm.Sequelize.UUIDV4,
                "allowNull": false

            },
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "is": {
                    "args": /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/i,
                    "msg": "Sólo se aceptan letras"
                  },
                  "len":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
            },
            "segundo_apellido": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "is": {
                    "args": /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/i,
                    "msg": "Sólo se aceptan letras"
                  },
                  "max":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
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
              }

            },
            "correo": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "isEmail": true,
                  "notNull": {
                    "msg": "Por favor, registre el correo electrónico"
                }
              },

            },
            "is_active": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": true

            },
            "is_baja": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": true

            },
            "fecha_baja": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": true,
                "defaultValue": "NULL"

            },
            "password": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": true,
              "defaultValue": "NULL",
              set: function(password) {
                  var rounds = 8;
                  var hashedpassword = bcrypt.hashSync(password, rounds);
                  this.setDataValue('password', hashedpassword);
            },

          },
            "check_password": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": true,
                "defaultValue": "NULL"

            },
            "RolesID": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Rol",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
            },
            "fecha_creado": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "fecha_modificacion": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false
            },
            "observacion": {
                "type": global.app.orm.Sequelize.TEXT('long'),
                "allowNull": true,
                "validate":{
                  "max": 255,
                }

            },
            "primer_apellido": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "is": {
                    "args": /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/i,
                    "msg": "Sólo se aceptan letras"
                  },
                  "max":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'nc_usuario',
            schema: 'noconformidades',
            hooks: {

            }
        });
        NCUsuario.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.NCUsuario.belongsTo(models.SCCargo);
            models.NCUsuario.belongsTo(models.SCRol);
        }
        NCUsuario.prototype.isValidPassword = function(password) {
            var hashedPassword = this.get('password');
            return bcrypt.compareSync(password, hashedPassword);
          }
};
