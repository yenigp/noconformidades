'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Turista = global.app.orm.sequelize.define('Turista',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idturista": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true
          },
            "nombre": {
                "type": global.app.orm.Sequelize.STRING

            },
            "ReservaPadreID": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "ReservaPadre",
                    "key": "idreservapadre"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
            },
            "idsuperclasifedad": {
                "type": global.app.orm.Sequelize.STRING

            },
            "telefono": {
                "type": global.app.orm.Sequelize.STRING

            },
            "email": {
                "type": global.app.orm.Sequelize.STRING

            },
            "fax": {
                "type": global.app.orm.Sequelize.STRING

            },
            "pasaporte": {
                "type": global.app.orm.Sequelize.STRING

            },
            "idoperacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idcotaislada": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtipopax": {
                "type": global.app.orm.Sequelize.STRING,
                "defaultValue": "TUR"
            },
            "sexo": {
                "type": global.app.orm.Sequelize.STRING
            },
            "referencia": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idhistoreservapadre": {
                "type": global.app.orm.Sequelize.INTEGER
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
            "ididio": {
                "type": global.app.orm.Sequelize.STRING
            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_turista',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Turista.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Turista.belongsTo(models.ReservaPadre);
            models.Turista.belongsTo(models.Pais);
        }

};
