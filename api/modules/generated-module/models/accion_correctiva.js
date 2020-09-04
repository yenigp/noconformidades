'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AcccionCorrectiva = global.app.orm.sequelize.define('AcccionCorrectiva',
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
            "estado": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "fechacumplimiento": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'accion_correctiva',
            schema: 'noconformidades',
            hooks: {

            }
        });
        AcccionCorrectiva.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.AcccionCorrectiva.belongsTo(models.Acciones, {
                as: 'id'
            });
        }
};
