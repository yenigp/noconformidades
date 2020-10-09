'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
  const Mercado = global.app.orm.sequelize.define('Mercado',
    lodash.extend({}, global.app.orm.mixins.attributes, {
      "activo": {
        "type": global.app.orm.Sequelize.INTEGER
      },
      "nombmercado": {
        "type": global.app.orm.Sequelize.STRING
      },
      "codigo": {
        "type": global.app.orm.Sequelize.STRING
      },
      "fultmodif": {
        "type": global.app.orm.Sequelize.DATE
      }
    }), {
      
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'Mercado',
            hooks: {

            }
    });
    Mercado.associate = function() {
      var models = global.app.orm.sequelize.models;
      models.Mercado.hasMany(models.ReservaPadre, {
          foreignKey: 'idmercado',
          constraints: false
      });
      models.Mercado.belongsToMany(models.Pais, {
          through: models.MercadoPais
      });
      models.Mercado.belongsToMany(models.AgenciaViajes, {
        through: models.AgenciaMercado
      });
    }

};