'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Reserva = global.app.orm.sequelize.define('Reserva',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idreserva": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true
          },
            "horasalida": {
                "type": global.app.orm.Sequelize.STRING

            },
            "fechafinal": {
                "type": global.app.orm.Sequelize.DATE

            },
            "fechainicio": {
                "type": global.app.orm.Sequelize.DATE

            },
            "tercero": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false,
                "defaultValue": 0

            },
            "fcreacion": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false,

            },
            "cantidadpax": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },
            "pagada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false,
                "defaultValue": 0
            },
            "idestadoreserva": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false
            },
            "idticket": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idvoucher": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtipoproducto": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false
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
            "idproductoterc": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtipocotizacion": {
                "type": global.app.orm.Sequelize.STRING
            },
            "free": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false,
                "defaultValue": 0
            },
            "nombservicio": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idcotaislada": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idserviciocotizacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idagproveedor_tmp": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "identproveedor_tmp": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "siovernight": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "idtiporegreserva": {
                "type": global.app.orm.Sequelize.STRING
            },
            "esprefacturada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "locindice": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false
            },
            "esautorizadaoperar": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "fechaautorizo": {
                "type": global.app.orm.Sequelize.DATE
            },
            "observacionesautorizo": {
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
            "habrecogida": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idlugarrec": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idvueloin": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idvueloout": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "siincluyeentrada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },
            "siincluyesalida": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },
            "notas": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idlugardejar": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "esventaexterior": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "numconfsolicitud": {
                "type": global.app.orm.Sequelize.STRING
            },
            "secotiza": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },
            "desglosegenerado": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "cantmay": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "cantmen": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "cantinf": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "essol": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "indicadorsolicitud": {
                "type": global.app.orm.Sequelize.STRING
            },
            "numsolicitud": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_vend": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_idio": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_creacion": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_usua_autoriza": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idestadocupo": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "QOR"
            },
            "cantadm": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "esfacturada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "idcondpago": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idclasiftipoproducto": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "locoperacion": {
                "type": global.app.orm.Sequelize.STRING
            },
            "locreservapadre": {
                "type": global.app.orm.Sequelize.STRING
            },
            "costo": {
                "type": global.app.orm.Sequelize.FLOAT
            },
            "escontabilizada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "esmismoserviniciofin": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "enableservinicial": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "enableservfinal": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "enablevueloentrada": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "enablevuelosalida": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "freecomentario": {
                "type": global.app.orm.Sequelize.STRING
            },
            "id_usua_lock": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "isingresoticketasentado": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "iddepartamento": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": -1
            },
            "iscostoasentado": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "idmotivocancel": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
            },
            "fechacancel": {
                "type": global.app.orm.Sequelize.DATE
            },
            "observaciones": {
                "type": global.app.orm.Sequelize.STRING
            },
            "tratar_idaret": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1
            },
            "id_usua_mod": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_mone": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "fultmodif": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW
            },
            "idestadoold": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_prest_tiposerv": {
                "type": global.app.orm.Sequelize.INTEGER
            },
        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_reserva',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Reserva.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Reserva.belongsTo(models.ReservaPadre);
            models.Reserva.belongsTo(models.Producto);
        }

};
