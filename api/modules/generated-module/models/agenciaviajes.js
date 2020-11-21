'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AgenciaViajes = global.app.orm.sequelize.define('AgenciaViajes',
        lodash.extend({}, global.app.orm.mixins.attributes, {
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
                "type": global.app.orm.Sequelize.INTEGER

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
                "type": global.app.orm.Sequelize.INTEGER

            },
            "escliente": {
                "type": global.app.orm.Sequelize.INTEGER

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
                "type": global.app.orm.Sequelize.INTEGER

            },
            "sicoorporativo": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "id_pais": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "idclasiftipoproducto": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "idestado": {
                "type": global.app.orm.Sequelize.STRING

            },
            "id_propietario": {
                "type": global.app.orm.Sequelize.INTEGER

            }
        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'AgenciaViajes',
            hooks: {

            }
        });
        AgenciaViajes.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.AgenciaViajes.belongsTo(models.Pais, {
                foreignKey: 'id_pais',
                constraints: false
            });
            models.AgenciaViajes.belongsTo(models.Sucursal, {
                foreignKey: 'id_propietario',
                constraints: false
            });
            models.AgenciaViajes.belongsTo(models.AgenciaViajes, {
                foreignKey: 'idagenciaviajesmatriz',
                constraints: false
            });
            models.AgenciaViajes.hasMany(models.AgenciaMercado, {
                foreignKey: 'AgenciaViajeId'
            });
        }
};
