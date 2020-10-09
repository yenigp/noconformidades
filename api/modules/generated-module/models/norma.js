'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Norma = global.app.orm.sequelize.define('Norma',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                  "len":{
                    "args": [3,50],
                    "msg": "El nombre de la norma debe tener como mínimo 3 carácteres"
                  },
                }
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
            tableName: 'Norma',
            hooks: {

            }
        });
        Norma.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.Norma.belongsTo(models.Usuario, {
              as: 'Creator'
          });    
        }      
};
