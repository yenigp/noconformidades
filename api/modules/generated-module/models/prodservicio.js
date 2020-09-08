'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const ProdServicio = global.app.orm.sequelize.define('ProdServicio',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idservicio": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true
          },
            "nombservicio": {
                "type": global.app.orm.Sequelize.STRING

            },
            "servpara": {
                "type": global.app.orm.Sequelize.STRING,
                "defaultValue": "TUR"

            },
            "sivariantes": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1

            },
            "sisuplemento": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "ProductoID": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Producto",
                    "key": "idproducto"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
            },
            "idtiposervicio": {
                "type": global.app.orm.Sequelize.STRING

            },
            "dia": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "cantidad": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "siflexible": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "idtipobono": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "sitercero": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "rp_idnodo": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 3

            },
            "siretorno": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "siidaretorno": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "siincluirvariante": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "inclcantreserva": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_prodservicio',
            schema: 'noconformidades',
            hooks: {

            }
        });
        ProdServicio.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.ProdServicio.belongsTo(models.Producto);
          }
};
