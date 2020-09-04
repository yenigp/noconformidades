'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const IndicadoresObjetivos = global.app.orm.sequelize.define('IndicadoresObjetivos',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "indicadores_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Indicadores",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "objetivo_calidad_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "ObjetivoCalidad",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'indicadores_objetivos',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
