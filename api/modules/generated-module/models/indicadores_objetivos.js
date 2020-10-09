'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const IndicadoresObjetivos = global.app.orm.sequelize.define('IndicadoresObjetivos',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "IndicadoresId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Indicadores",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "ObjetivosId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "ObjetivosCalidad",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'IndicadoresObjetivos',
            hooks: {

            }
        });
};
