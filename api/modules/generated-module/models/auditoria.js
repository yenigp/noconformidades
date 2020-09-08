'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Auditoria = global.app.orm.sequelize.define('Auditoria',
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
            "observacion": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'auditoria',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Auditoria.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Auditoria.belongsTo(models.NoConformidad, {
                as: 'NoConformidad'
            });
        }
};
