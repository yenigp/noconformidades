'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Norma = global.app.orm.sequelize.define('Norma',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "unique": true,
                "validate": {
                  isUnique(value) {
                    return Norma.findOne({
                      where: {nombre:value}
                    }).then((nombre) => {
                      if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                  }
                },
            },
            "status": {
              "type": global.app.orm.Sequelize.ENUM,
              "values": ["enabled", "blocked"],
              "defaultValue": "enabled"
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
