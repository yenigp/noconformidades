'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Turista = global.app.orm.sequelize.define('Turista',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING

            },
            "idreservapadre": {
                "type": global.app.orm.Sequelize.INTEGER

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
                "type": global.app.orm.Sequelize.STRING

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
            "id_pais": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "id_idio": {
                "type": global.app.orm.Sequelize.STRING
            },
            "edad": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "numero": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "tipo_doc_prm": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "tipo_doc_sec": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "nombre_seg": {
                "type": global.app.orm.Sequelize.STRING
            },
            "emisor_doc_prm": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "emisor_doc_sec": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "documento_sec": {
                "type": global.app.orm.Sequelize.STRING
            },
            "fecha_venc_prm": {
                "type": global.app.orm.Sequelize.DATE
            },
            "fecha_venc_sec": {
                "type": global.app.orm.Sequelize.DATE
            },
            "fecha_nac": {
                "type": global.app.orm.Sequelize.DATE
            },
            "direccion": {
                "type": global.app.orm.Sequelize.STRING
            },
            "direccion2": {
                "type": global.app.orm.Sequelize.STRING
            },
            "codigopostal": {
                "type": global.app.orm.Sequelize.STRING
            },
            "vuelo_ret": {
                "type": global.app.orm.Sequelize.STRING
            },
            "id_paisresid": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "codigopostal2": {
                "type": global.app.orm.Sequelize.STRING
            },
            "estadodir": {
                "type": global.app.orm.Sequelize.STRING
            },
            "estadodir2": {
                "type": global.app.orm.Sequelize.STRING
            },
            "ciudad": {
                "type": global.app.orm.Sequelize.STRING
            },
            "ciudad2": {
                "type": global.app.orm.Sequelize.STRING
            },
            "apellidos": {
                "type": global.app.orm.Sequelize.STRING
            },
            "apellidos2": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idclaseaerea": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING
            },
            "telefono2": {
                "type": global.app.orm.Sequelize.STRING
            }
            
        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'Turista',
            hooks: {

            }
        });
        Turista.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Turista.hasMany(models.QuejasReclamaciones, {
                foreignKey: 'TuristaId',
                constraints: false
            });
            models.Turista.belongsTo(models.ReservaPadre, {
                foreignKey: 'idreservapadre',
                constraints: false
            });
            models.Turista.belongsTo(models.Pais, {
                foreignKey: 'id_pais',
                constraints: false
            });
            models.Turista.hasMany(models.TuristaReserva, {
                foreignKey: 'TuristaID'
            });
        }

};
