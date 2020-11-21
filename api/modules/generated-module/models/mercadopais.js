'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
  const MercadoPais = global.app.orm.sequelize.define('MercadoPais',
    lodash.extend({}, global.app.orm.mixins.attributes, {
      "MercadoId": {
        "type": global.app.orm.Sequelize.INTEGER
      },
      "PaisId": {
        "type": global.app.orm.Sequelize.INTEGER
      },
      "activo": {
        "type": global.app.orm.Sequelize.INTEGER
      }
    }), {
      
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'MercadoPais',
            hooks: {

            }
    });
    MercadoPais.removeAttribute('id');

    MercadoPais.associate = function() {
      var models = global.app.orm.sequelize.models;
      models.MercadoPais.belongsTo(models.Mercado, {
          foreignKey: 'MercadoId'
      });
      models.MercadoPais.belongsTo(models.Pais, {
        foreignKey: 'PaisId'
    })
  }

};