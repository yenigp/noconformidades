'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Sucursal = global.app.orm.sequelize.define('Sucursal',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idagenciaviajes_tmp": {
            "type": global.app.orm.Sequelize.INTEGER,

          },
            "global_name": {
                "type": global.app.orm.Sequelize.STRING

            },
            "nombagenciaviajes": {
                "type": global.app.orm.Sequelize.STRING

            },
            "iscasamatriz": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "defaultValue": 0

            },
            "activo": {
                "type": global.app.orm.Sequelize.STRING,
                "defaultValue": 1

            },
            "tnsnames": {
                "type": global.app.orm.Sequelize.STRING

            },
            "ini_sec": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "fin_sec": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "comentario": {
                "type": global.app.orm.Sequelize.STRING
            },
            "schemaname": {
                "type": global.app.orm.Sequelize.STRING
            },
            "password": {
                "type": global.app.orm.Sequelize.STRING
            },
            "verestadisticas": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "id_cons_enti": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false,
            },
            "codagenciaviajes": {
                "type": global.app.orm.Sequelize.STRING
            },
            "sidatosiniciales": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "conectada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },
            "fultmodif": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW
            },
            "idprestatario": {
                "type": global.app.orm.Sequelize.INTEGER
            },

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'Sucursal',
            hooks: {

            }
        });

        Sucursal.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Sucursal.hasMany(models.AgenciaViajes, {
                foreignKey: 'id_propietario',
                constraints: false
            });
            models.Sucursal.hasMany(models.Producto, {
                foreignKey: 'idagenciaviajes_tmp'
            })
        }

};