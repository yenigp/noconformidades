'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Expediente = global.app.orm.sequelize.define('Expediente',
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
            "evidencia": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["abierto", "cerrado"],
                "defaultValue": "abierto"

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
            tableName: 'Expediente',
            hooks: {

            }
        });
        Expediente.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Expediente.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Expediente.belongsTo(models.NoConformidad, {
                as: 'NoConformidad'
            });
        }

};
