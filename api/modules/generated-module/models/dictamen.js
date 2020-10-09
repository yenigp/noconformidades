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
                "allowNull": false

            },
            "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["aprobado", "denegado"],
                "allowNull": true

            },
            "fechaaprobacion": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "conclusiones": {
                "type": global.app.orm.Sequelize.STRING,
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
