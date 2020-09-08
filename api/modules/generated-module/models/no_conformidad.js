'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const NoConformidad = global.app.orm.sequelize.define('NoConformidad',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "proceso_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Proceso",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "modalidad_turistica_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "ModalidadTuristica",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "norma_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Norma",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "codigo_nc": {
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
            "fechainicio": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW,
                "allowNull": false

            },
            "fechatermino": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "tipo": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["Sistema de calidad", "Calidad a los procesos"],
                "defaultValue": "enabled"

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
            "fechaidentificacion": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "procede": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": false
            },
            "cerrar": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": false

            },
            "fecharevision": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "fechacierre": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "discr": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "TuristaID": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Turista",
                    "key": "idturista"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'no_conformidad',
            schema: 'noconformidades',
            hooks: {

            }
        });
        NoConformidad.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.NoConformidad.hasOne(models.Auditoria);
            models.NoConformidad.hasOne(models.Incidencia);
            models.NoConformidad.hasOne(models.QuejasReclamaciones);
            models.NoConformidad.belongsTo(models.Proceso);
            models.NoConformidad.belongsTo(models.ModalidadTuristica);
            models.NoConformidad.belongsTo(models.Norma);
            models.NoConformidad.belongsTo(models.Turista);
        }

};
