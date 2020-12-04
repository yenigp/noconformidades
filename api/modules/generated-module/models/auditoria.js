'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Auditoria = global.app.orm.sequelize.define('Auditoria',
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
          "procedencia": {
              "type": global.app.orm.Sequelize.DATE,
              "allowNull": false
          },
            "observacion": {
                "type": global.app.orm.Sequelize.STRING,
                "validate":{
                    "len":{
                      "args": [10,255],
                      "msg": "Mínimo 10 y máximo 255 carácteres"
                    },
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
            tableName: 'Auditoria',
            hooks: {

            }
        });
        Auditoria.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Auditoria.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Auditoria.belongsTo(models.NoConformidad, {
                
            });
        }
};
