'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const ProdServicio = global.app.orm.sequelize.define('ProdServicio',
        lodash.extend({}, global.app.orm.mixins.attributes, {
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
            "idproducto": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtiposervicio": {
                "type": global.app.orm.Sequelize.STRING

            },
            "dia": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "horaserv": {
                "type": global.app.orm.Sequelize.STRING

            },
            "cantidad": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "siflexible": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "idtipobono": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "sitercero": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "rp_idnodo": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "siretorno": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "siidaretorno": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "siincluirvariante": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "inclcantreserva": {
                "type": global.app.orm.Sequelize.INTEGER

            },

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'ProdServicio',
            hooks: {

            }
        });
        ProdServicio.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.ProdServicio.belongsTo(models.Producto, {
                foreignKey: 'idproducto',
                constraints: false
            });
          }
};
