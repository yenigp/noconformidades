'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AcccionTarea = global.app.orm.sequelize.define('AcccionTarea',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "tarea_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Tareas",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "acciones_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Acciones",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'accion_tarea',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
