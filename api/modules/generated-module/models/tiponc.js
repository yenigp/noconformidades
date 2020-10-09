'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const TipoNC = global.app.orm.sequelize.define('TipoNC',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "validate": {
                  "isUppercase": true,
                },
                "allowNull": false

            },
            "nombre": {
              "type": global.app.orm.Sequelize.STRING,
              /*"validate": {
                "isAlphanumeric": true,
              },*/
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
            tableName: 'TipoNC',
            hooks: {

            }
        });
        TipoNC.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.TipoNC.belongsTo(models.Usuario, {
              as: 'Creator'
          });
          models.TipoNC.hasMany(models.NoConformidad, {
            as: "Tipo",
            foreignKey: "TipoId"
          });        
        }      
};
