'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AccionCorrectiva = global.app.orm.sequelize.define('AccionCorrectiva',
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
        AccionCorrectiva.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.AccionCorrectiva.belongsTo(models.Acciones, {
                as: 'Acciones'
            });
        }
};
