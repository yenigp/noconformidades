'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AgenciaViajes = global.app.orm.sequelize.define('AgenciaViajes',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "AgenciaViajesID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Sucursal",
                  "key": "idagenciaviajes_tmp"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "email": {
                "type": global.app.orm.Sequelize.STRING

            },
            "refcontable": {
                "type": global.app.orm.Sequelize.STRING

            },
            "puertoagencia": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "ipagencia": {
                "type": global.app.orm.Sequelize.STRING
            },
            "sicasamatriz": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },

            "descripcion": {
                "type": global.app.orm.Sequelize.STRING
            },
            "nombagenciaviajes": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idagrupacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "direccion": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idagenciaviajesmatriz": {
                "type": global.app.orm.Sequelize.INTEGER,
                "unique": "compositeIndex"
            },
            "escliente": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "id_acre_deud": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_cons_enti": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idpolo": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "simontar": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "sicoorporativo": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "PaisID": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Pais",
                    "key": "idpais"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
            },
            "idclasiftipoproducto": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idestado": {
                "type": global.app.orm.Sequelize.STRING
            },
            "id_propietario": {
                "type": global.app.orm.Sequelize.INTEGER
            },


        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_agenciaviajes',
            schema: 'noconformidades',
            hooks: {

            }
        });
        AgenciaViajes.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.AgenciaViajes.belongsTo(models.Sucursal, {
                as: 'AgenciaViajes'
            });
            models.AgenciaViajes.belongsTo(models.Pais);
        }
};
