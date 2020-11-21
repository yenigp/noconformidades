'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AgenciaMercado = global.app.orm.sequelize.define('AgenciaMercado',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "AgenciaViajeId": {
              "type": global.app.orm.Sequelize.INTEGER
          },
          "MercadoId": {
              "type": global.app.orm.Sequelize.INTEGER
          },
            "activo": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "pordefecto": {
                "type": global.app.orm.Sequelize.INTEGER

            },

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'AgenciaMercado',
            hooks: {

            }
        });
        AgenciaMercado.removeAttribute('id');

        AgenciaMercado.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.AgenciaMercado.belongsTo(models.AgenciaViajes, {
              foreignKey: 'AgenciaViajeId'
          });
          models.AgenciaMercado.belongsTo(models.Mercado, {
            foreignKey: 'MercadoId'
        })
      }
};
