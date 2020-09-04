'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AcccionMejora = global.app.orm.sequelize.define('AcccionMejora',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Acciones",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false,
              "primaryKey": true
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'accion_mejora',
            schema: 'noconformidades',
            hooks: {

            }
        });
        AcccionMejora.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.AcccionMejora.belongsTo(models.Acciones, {
                as: 'id'
            });
        }
};
