'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const QuejasReclamaciones = global.app.orm.sequelize.define('QuejasReclamaciones',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "NoConformidad",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false,
              "primaryKey": true
          },
            "clasificacion": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "costonocalidad": {
                "type": global.app.orm.Sequelize.DOUBLE,
                "allowNull": false

            },
            "observacion": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'quejas_reclamacione',
            schema: 'noconformidades',
            hooks: {

            }
        });
        QuejasReclamaciones.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.QuejasReclamaciones.belongsTo(models.NoConformidad, {
                as: 'id'
            });
        }
};
