'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AccionTarea = global.app.orm.sequelize.define('AccionTarea',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "AccionesId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Acciones",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "TareasId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Tareas",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'AccionTarea',
            hooks: {

            }
        });
};
