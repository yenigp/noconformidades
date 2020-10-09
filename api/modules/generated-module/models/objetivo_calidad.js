'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const ObjetivosCalidad = global.app.orm.sequelize.define('ObjetivosCalidad',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "isAlpha": {
                    "msg": "El nombre de un objetivo solo puede contener letras"
                  },
                  "len":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
            },
            "fechacomienzo": {
                "type": global.app.orm.Sequelize.DATEONLY,

            },
            "fechafin": {
              "type": global.app.orm.Sequelize.DATE
      
            },
            "valoralcanzar": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "cumplimiento": {
                "type": global.app.orm.Sequelize.FLOAT,
                "allowNull": false

            },
            "periodicidadseguimiento": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "comentario": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": true

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
            tableName: 'ObjetivosCalidad',
            hooks: {

            }
        });
        ObjetivosCalidad.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.ObjetivosCalidad.belongsTo(models.Usuario, {
              as: 'Creator'
          });    
          models.ObjetivosCalidad.belongsToMany(models.Indicadores, {
              through: models.IndicadoresObjetivos
          })
        }  
};
