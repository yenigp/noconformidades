'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Producto = global.app.orm.sequelize.define('Producto',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
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
                "type": global.app.orm.Sequelize.INTEGER

            },
            "idtipoproducto": {
                "type": global.app.orm.Sequelize.STRING

            },
            "idestado": {
                "type": global.app.orm.Sequelize.STRING

            },
            "idagenciaviajes_tmp": {
                "type": global.app.orm.Sequelize.INTEGER

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
                "type": global.app.orm.Sequelize.INTEGER

            },
            "minimo": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "rp_idnodo": {
                "type": global.app.orm.Sequelize.INTEGER

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
                "type": global.app.orm.Sequelize.INTEGER

            },
            "incluireserva": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "siservtte": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "fultmodif": {
                "type": global.app.orm.Sequelize.DATE

            },
            "idprestatario": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_prest_tiposerv": {
                "type": global.app.orm.Sequelize.INTEGER
            },

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'Producto',
            hooks: {

            }
        });
        Producto.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Producto.hasMany(models.Reserva, {
                foreignKey: 'idproducto',
                constraints: false
            });
            models.Producto.belongsTo(models.Sucursal,{
                foreignKey: 'idagenciaviajes_tmp',
                constraints: false
            });
        }

};
