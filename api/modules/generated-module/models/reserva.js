'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Reserva = global.app.orm.sequelize.define('Reserva',
        lodash.extend({}, global.app.orm.mixins.attributes, {
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
                "type": global.app.orm.Sequelize.INTEGER

            },
            "fcreacion": {
                "type": global.app.orm.Sequelize.DATE

            },
            "cantidadpax": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "pagada": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idestadoreserva": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idticket": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idvoucher": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtipoproducto": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idproducto": {
                "type": global.app.orm.Sequelize.INTEGER,
                "comment": "The foreing object that will have the Producto"
      
            },
            "idproductoterc": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtipocotizacion": {
                "type": global.app.orm.Sequelize.STRING
            },
            "free": {
                "type": global.app.orm.Sequelize.INTEGER
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
                "type": global.app.orm.Sequelize.INTEGER
            },
            "idtiporegreserva": {
                "type": global.app.orm.Sequelize.STRING
            },
            "esprefacturada": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "locindice": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "esautorizadaoperar": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "fechaautorizo": {
                "type": global.app.orm.Sequelize.DATE
            },
            "observacionesautorizo": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idreservapadre": {
                "type": global.app.orm.Sequelize.INTEGER,
                "comment": "The foreing object that will have the ReservaPadre"
      
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
                "type": global.app.orm.Sequelize.INTEGER
            },
            "siincluyesalida": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "notas": {
                "type": global.app.orm.Sequelize.STRING
            },
            "idlugardejar": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "esventaexterior": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "numconfsolicitud": {
                "type": global.app.orm.Sequelize.STRING
            },
            "secotiza": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "desglosegenerado": {
                "type": global.app.orm.Sequelize.INTEGER
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
            "essol": {
                "type": global.app.orm.Sequelize.INTEGER
                
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
                "type": global.app.orm.Sequelize.STRING
            },
            "cantadm": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "esfacturada": {
                "type": global.app.orm.Sequelize.INTEGER
                
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
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "esmismoserviniciofin": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "enableservinicial": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "enableservfinal": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "enablevueloentrada": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "enablevuelosalida": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "freecomentario": {
                "type": global.app.orm.Sequelize.STRING
            },
            "id_usua_lock": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "isingresoticketasentado": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "iddepartamento": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "iscostoasentado": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "idmotivocancel": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "fechacancel": {
                "type": global.app.orm.Sequelize.DATE
            },
            "observaciones": {
                "type": global.app.orm.Sequelize.STRING
            },
            "tratar_idaret": {
                "type": global.app.orm.Sequelize.INTEGER
                
            },
            "id_usua_mod": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "id_mone": {
                "type": global.app.orm.Sequelize.INTEGER
            },
            "fultmodif": {
                "type": global.app.orm.Sequelize.DATE
            },
            "idestadoold": {
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
            tableName: 'Reserva',
            hooks: {

            }
        });
        Reserva.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Reserva.belongsTo(models.ReservaPadre,
                {
                    foreignKey: 'idreservapadre',
                    constraints: false
                });
            models.Reserva.belongsTo(models.Producto, 
                {
                    foreignKey: 'idproducto',
                    constraints: false
                });
            models.Reserva.belongsTo(models.Reserva,
                {
                    foreignKey: 'idserviciocotizacion',
                    constraints: false
                });
            models.Reserva.hasMany(models.TuristaReserva, 
                {
                    foreignKey: 'ReservaID'
                });
                models.Reserva.hasMany(models.QuejasReclamaciones, {
                    foreignKey: 'ReservaId',
                    constraints: false
                });
                
        }

};
