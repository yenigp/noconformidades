'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Proceso = global.app.orm.sequelize.define('Proceso',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "codigo": {
            "type": global.app.orm.Sequelize.STRING,
            "allowNull": false,
            "validate":{
              "max": 2
            }
          },
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  /*"isAlpha": {
                    "msg": "El nombre de un proceso solo puede contener letras"
                  },*/
                  "len":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
            },
            "tipo": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["realización", "estratégico", "de apoyo"],
                "allowNull": false

            },
            "jefeproceso": {
              "type": global.app.orm.Sequelize.INTEGER,
              "allowNull": false
      
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
            tableName: 'Proceso',
            hooks: {

            }
        });
        Proceso.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.Proceso.belongsTo(models.Usuario, {
              as: 'Creator'
          });  
          models.Proceso.belongsTo(models.Usuario, {
            foreignKey: 'jefeproceso',
            //constraints: false
          }); 
          models.Proceso.hasMany(models.Indicadores, {
              as: "Indicadores",
              foreignKey: "IndicadorId"

          });
          models.Proceso.hasMany(models.NoConformidad, {
            as: "NoConformidad",
            foreignKey: "ProcesoId"
        });
        }  

};
