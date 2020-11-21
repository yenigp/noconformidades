'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Dictamen = global.app.orm.sequelize.define('Dictamen',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "QuejasReclamacionesId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "QuejasReclamaciones",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "unique": true,
                "validate": {
                    isUnique(value) {
                      return Dictamen.findOne({
                        where: {codigo:value}
                      }).then((codigo) => {
                        if (codigo) {throw new Error('Error: el código' + ' ' + (value) + ' ' + 'ya existe')}
                      })
                    }
                  },
                "allowNull": false

            },
            "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["aprobado", "denegado"],
                "allowNull": true

            },
            "FechaAprobacion": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "conclusiones": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                    "len":{
                      "args": [10,255],
                      "msg": "Mínimo 10 y máximo 255 carácteres"
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
            tableName: 'Dictamen',
            hooks: {

            }
        });
        Dictamen.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Dictamen.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Dictamen.belongsTo(models.QuejasReclamaciones, {
                as: 'QuejasReclamaciones'
            });
        }

};
