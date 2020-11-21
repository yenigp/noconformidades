'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const TipoAC = global.app.orm.sequelize.define('TipoAC',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "validate": {
                  "isUppercase": true,
                  isUnique(value) {
                    return TipoAC.findOne({
                      where: {codigo:value}
                    }).then((codigo) => {
                      if (codigo) {throw new Error('Error: el código' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                  }
                },
                "allowNull": false

            },
            "nombre": {
              "type": global.app.orm.Sequelize.STRING,
              "unique": true,
              "validate": {
                isUnique(value) {
                  return TipoAC.findOne({
                    where: {nombre:value}
                  }).then((nombre) => {
                    if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                  })
                }
              },
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
            tableName: 'TipoAC',
            hooks: {

            }
        });
        TipoAC.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.TipoAC.belongsTo(models.Usuario, {
              as: 'Creator'
          });
          models.TipoAC.hasMany(models.Acciones, {
            as: "Tipo",
            foreignKey: "TipoId"
          });        
        }      
};
