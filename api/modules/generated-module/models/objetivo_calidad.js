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
                  isUnique(value) {
                    return ObjetivosCalidad.findOne({
                      where: {nombre:value}
                    }).then((nombre) => {
                      if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                  },
                  "len":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                }
            },
            "FechaComienzo": {
                "type": global.app.orm.Sequelize.DATEONLY,

            },
            "FechaFin": {
              "type": global.app.orm.Sequelize.DATE
      
            },
            "ValorAlcanzar": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "cumplimiento": {
                "type": global.app.orm.Sequelize.FLOAT,
                "allowNull": false

            },
            "PeriodicidadSeguimiento": {
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
          models.ObjetivosCalidad.hasMany(models.IndicadoresObjetivos, {
              foreignKey: 'ObjetivosId'
          })
        }  
};
