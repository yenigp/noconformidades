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
              "allowNull": false
          },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "is": {
                    "args": /^[A-Z]{4}[0-9]{6}$/i,
                    "msg": "Sólo se aceptan 4 letras seguidas de 6 números"
                  },
                 "max":{
                    "args": [10],
                    "msg": "Máximo 10 carácteres"
                  },
                }
            },
            "fecharegistro": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW,
                "allowNull": false

            },
            "fechaidentificacion": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "fechatermino": {
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
                "allowNull": false

            },
            "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["identificado", "análizado", "corregido", "seguiendo", "cerrado"],
                "defaultValue": "identificado"

              },
              "fecharevision": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

              },
              "fechacierre": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

              },
              "AreaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Area",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"
        
              },
              "gravedad": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["crítica", "mayor"],
                "allowNull": false
                
              },
              "CreatorId": {
                  "type": global.app.orm.Sequelize.INTEGER,
                  "references": {
                      "model": "Usuario",
                      "key": "id"
                  },
                  "onUpdate": "cascade",
                  "onDelete": "cascade"
        
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
                foreignKey: 'NoConformidadId'
            });
            models.NoConformidad.hasOne(models.Incidencia, {
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
                as: 'Creator'
            });  
            models.NoConformidad.belongsTo(models.Proceso, {
                as: 'Proceso'
            });
            models.NoConformidad.belongsTo(models.Norma, {
                as: 'Norma'
            });
            models.NoConformidad.belongsTo(models.TipoNC, {
              as: 'Tipo'
            });
            models.NoConformidad.belongsToMany(models.Acciones, {
                through: models.NCAcciones
            });
        }

};
