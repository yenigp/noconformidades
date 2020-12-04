'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const NoConformidad = global.app.orm.sequelize.define('NoConformidad',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "ProcesoId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Proceso",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "NormaId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Norma",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              //"allowNull": false
          },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "unique": true,
                "allowNull": false,
                /*"validate": {
                    "max": 10,
                    isUnique(value) {
                        return NoConformidad.findOne({
                        where: {codigo:value}
                          }).then((codigo) => {
                        if (codigo) {throw new Error('Error: el código' + ' ' + (value) + ' ' + 'ya existe')}
                        })
                    }
                },*/
            },
            "FechaRegistro": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW,
                "allowNull": false

            },
            "FechaIdentificacion": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "FechaTermino": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "TipoId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "TipoNC",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
            },
            "descripcion": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "len":{
                    "args": [10,255],
                    "msg": "Mínimo 10 y máximo 255 carácteres"
                  },
                }

            },
            "evidencia": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "resultado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["procede", "no procede"],
                //"allowNull": false

            },
            "status": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["pendiente", "abierta", "analizando", "cerrado"],
                "defaultValue": "pendiente"

              },
              "FechaRevision": {
                "type": global.app.orm.Sequelize.DATE,
                //"allowNull": false

              },
              "FechaCierre": {
                "type": global.app.orm.Sequelize.DATE,
                //"allowNull": false

              },
              "AreaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Area",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                //"allowNull": false
        
              },
              "gravedad": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["crítica", "mayor"],
                //"allowNull": false
                
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
              "EspCalidad": {
                "type": global.app.orm.Sequelize.INTEGER,
                "comment": "The foreing object that will have the Usuario.",
                "noUpdate": true

              },
              "JefeProceso": {
                "type": global.app.orm.Sequelize.INTEGER,
                "comment": "The foreing object that will have the Usuario.",
                //"noUpdate": true
              },
              "SucursalId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "comment": "The foreing object that will have the Sucursal.",
                //"noUpdate": true
              }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'NoConformidad',
            hooks: {

            }
        });
        NoConformidad.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.NoConformidad.hasOne(models.Auditoria, {
                as: 'Auditoria',
                foreignKey: 'NoConformidadId'
            });
            models.NoConformidad.hasOne(models.Incidencia, {
                as: 'Incidencia',
                foreignKey: 'NoConformidadId'
            });
            models.NoConformidad.hasOne(models.QuejasReclamaciones, {
                foreignKey: 'NoConformidadId'
            });
            models.NoConformidad.hasOne(models.Expediente, {
                 as: 'Expediente', 
                 foreignKey: 'NoConformidadId'
            });
            models.NoConformidad.belongsTo(models.Usuario, {
                as: 'Creator',
                foreignKey: 'CreatorId'
            });
            models.NoConformidad.belongsTo(models.Usuario, {
                foreignKey: 'EspCalidad',
                constraints: false
            });  
            models.NoConformidad.belongsTo(models.Usuario, {
                foreignKey: 'JefeProceso',
                constraints: false
            });  
            models.NoConformidad.belongsTo(models.Proceso, {
                as: 'Proceso',
                foreignKey: 'ProcesoId'
            });
            models.NoConformidad.belongsTo(models.Norma, {
                as: 'Norma',
                foreignKey: 'NormaId'
            });
            models.NoConformidad.belongsTo(models.TipoNC, {
                as: 'Tipo',
                foreignKey: 'TipoId'
            });
            models.NoConformidad.belongsTo(models.Area, {
                as: 'Area',
                foreignKey: 'AreaId'
              });
            models.NoConformidad.belongsTo(models.Sucursal, {
                as: 'Sucursal',
                foreignKey: 'SucursalId'
            });
            models.NoConformidad.hasMany(models.NCAcciones, {
                foreignKey: 'NoConformidadId'
            });
        }

};
