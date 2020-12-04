'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Incidencia = global.app.orm.sequelize.define('Incidencia',
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
          "tipo": {
            "type": global.app.orm.Sequelize.ENUM,
            "values": ["traslado", "alojamiento", "renta de autos", "vuelo", "restauración"],
            "allowNull": false

            },
            "CausaInvestigacion": {
                "type": global.app.orm.Sequelize.BOOLEAN,
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
            tableName: 'Incidencia',
            hooks: {

            }
        });
        Incidencia.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Incidencia.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Incidencia.belongsTo(models.NoConformidad, {
                //as: 'NoConformidad'
            });
        }
};
