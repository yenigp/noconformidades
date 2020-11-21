'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
  const Pais = global.app.orm.sequelize.define('Pais',
    lodash.extend({}, global.app.orm.mixins.attributes, {
      "codigo": {
        "type": global.app.orm.Sequelize.STRING
      },
      "descripcion": {
        "type": global.app.orm.Sequelize.STRING
      },
      "id_idio": {
        "type": global.app.orm.Sequelize.INTEGER
      },
      "codigo_telefono": {
        "type": global.app.orm.Sequelize.INTEGER
      },
      "activo": {
        "type": global.app.orm.Sequelize.INTEGER
      },
      "codigo2": {
        "type": global.app.orm.Sequelize.STRING
      }
    }), {
      
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'Pais',
            hooks: {

            }
    });

    Pais.associate = function() {
      var models = global.app.orm.sequelize.models;
      models.Pais.hasMany(models.ReservaPadre, {
        foreignKey: 'id_pais',
        constraints: false
      });
      models.Pais.hasMany(models.Turista, {
        foreignKey: 'id_pais',
        constraints: false
      });
      models.Pais.hasMany(models.AgenciaViajes, {
        foreignKey: 'id_pais',
        constraints: false
      });
      models.Pais.hasMany(models.MercadoPais, {
        foreignKey: 'PaisId'
      });
    }

};