'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Incidencia = global.app.orm.sequelize.define('Incidencia',
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
            "causainvestigacion": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'incidencia',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Incidencia.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Incidencia.belongsTo(models.NoConformidad, {
                as: 'NoConformidad'
            });
        }
};
