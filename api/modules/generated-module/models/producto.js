'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Producto = global.app.orm.sequelize.define('Producto',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idproducto": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true
          },
            "nombproducto": {
                "type": global.app.orm.Sequelize.STRING

            },
            "descripproducto": {
                "type": global.app.orm.Sequelize.STRING

            },
            "duracion": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "sivariantes": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "idtipoproducto": {
                "type": global.app.orm.Sequelize.STRING

            },
            "idestado": {
                "type": global.app.orm.Sequelize.STRING

            },
            "SucursalID": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Sucursal",
                    "key": "idagenciaviajes_tmp"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
            },
            "idclasificacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "identidadtt": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idclasiftipoproducto": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "siservaloj": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "minimo": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "rp_idnodo": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 3
            },
            "idprdclasifguia": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "fechacreacion": {
                "type": global.app.orm.Sequelize.DATE
            },
            "id_usua": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idprodvariante": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "esalamedida": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "incluireserva": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },
            "siservtte": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "fultmodif": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW
            },
            "idprestatario": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_prest_tiposerv": {
                "type": global.app.orm.Sequelize.INTEGER
            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_producto',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Producto.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Producto.belongsTo(models.Sucursal);
        }

};
