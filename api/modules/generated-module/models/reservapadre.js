'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const ReservaPadre = global.app.orm.sequelize.define('ReservaPadre',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "fechacierre": {
                "type": global.app.orm.Sequelize.DATE
            },
            "free": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "fechanotificacion": {
                "type": global.app.orm.Sequelize.DATE

            },
            "fcreacion": {
                "type": global.app.orm.Sequelize.DATE

            },
            "cantidadpax": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "localizador": {
                "type": global.app.orm.Sequelize.STRING

            },
            "anombrede": {
                "type": global.app.orm.Sequelize.STRING

            },
            "fsolicitud": {
                "type": global.app.orm.Sequelize.DATE
            },
            "esventaconticket": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idcliente": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtipocliente": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idmercado": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idrespuesta": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idestado": {
                "type": global.app.orm.Sequelize.STRING
            },
            "referencia": {
                "type": global.app.orm.Sequelize.STRING
            },
            "cantmay": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "cantmen": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "cantinf": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_vend": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_cierre": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_creacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_historico": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_notificacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idestadocupo": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "cantadm": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_lock": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "iddepartamento": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_idio": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "observnotificacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_pais": {
                "type": global.app.orm.Sequelize.INTEGER
            },

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'ReservaPadre',
            hooks: {

            }
        });

        ReservaPadre.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.ReservaPadre.hasMany(models.Reserva, {
                foreignKey: 'idreservapadre',
                constraints: false
            });
            models.ReservaPadre.hasMany(models.QuejasReclamaciones, {
                foreignKey: 'ReservaId',
                constraints: false
            });
            models.ReservaPadre.hasMany(models.Turista, {
                foreignKey: 'idreservapadre',
                constraints: false
            });
            models.ReservaPadre.belongsTo(models.Mercado, {
                foreignKey: 'idmercado',
                constraints: false
            });
            models.ReservaPadre.belongsTo(models.Pais, {
                foreignKey: 'id_pais',
                constraints: false
            });
        }

};
