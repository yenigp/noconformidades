'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const QuejasReclamaciones = global.app.orm.sequelize.define('QuejasReclamaciones',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "NoConformidadId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "NoConformidad",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false

          },
          "ServicioId": {
            "type": global.app.orm.Sequelize.INTEGER,
            "comment": "The foreing object that will have the ProdServicio.",
            "allowNull": false,
            "noUpdate": true
          },
          "ProductoId": {
            "type": global.app.orm.Sequelize.INTEGER,
            "comment": "The foreing object that will have the Producto.",
            "allowNull": false,
            "noUpdate": true

          },
          "TuristaId": {
            "type": global.app.orm.Sequelize.INTEGER,
            "comment": "The foreing object that will have the Turista.",
            "allowNull": true,
            "noUpdate": true

          },
          "ReservaId": {
            "type": global.app.orm.Sequelize.INTEGER,
            "comment": "The foreing object that will have the Area.",
            "allowNull": false,
            "noUpdate": true
            
          },
          "tipo": {
            "type": global.app.orm.Sequelize.ENUM,
            "values": ["queja", "reclamación"],
            "allowNull": false

          },        
          "clasificacion": {
            "type": global.app.orm.Sequelize.ENUM,
            "values": ["interna", "externa"],
            "allowNull": false
    
          },
          "CostoNoCalidad": {
            "type": global.app.orm.Sequelize.FLOAT

          },
          "observacion": {
            "type": global.app.orm.Sequelize.STRING

          },
          "CreatorId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Usuario",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade"
    
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'QuejasReclamaciones',
            hooks: {

            }
        });
        QuejasReclamaciones.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.QuejasReclamaciones.belongsTo(models.Usuario, {
                as: 'Creator'
            });   
            models.QuejasReclamaciones.belongsTo(models.NoConformidad, {
                //as: 'NoConformidad'
            });
            models.QuejasReclamaciones.belongsTo(models.ProdServicio, {
                as: 'Servicio',
                foreignKey: 'ServicioId',
                constraints: false
            });
            models.QuejasReclamaciones.belongsTo(models.Producto, {
                as: 'Producto',
                foreignKey: 'ProductoId',
                constraints: false
            });
            models.QuejasReclamaciones.belongsTo(models.Turista, {
                as: 'Turista',
                foreignKey: 'TuristaId',
                constraints: false
            });
            models.QuejasReclamaciones.belongsTo(models.ReservaPadre, {
                as: 'Reserva',
                foreignKey: 'ReservaId',
                constraints: false
            });
            models.QuejasReclamaciones.hasOne(models.Dictamen, { 
                as: "Dictamen",
                foreignKey: "QuejasReclamacionesId" });
        }
};
