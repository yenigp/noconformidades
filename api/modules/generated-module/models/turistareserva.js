'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const TuristaReserva = global.app.orm.sequelize.define('TuristaReserva',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "TuristaID": {
              "type": global.app.orm.Sequelize.INTEGER
          },
          "ReservaID": {
              "type": global.app.orm.Sequelize.INTEGER
          },
          "idclasifedad": {
            "type": global.app.orm.Sequelize.INTEGER
          },
          "pagada": {
            "type": global.app.orm.Sequelize.INTEGER
          },
         "idcondpago": {
            "type": global.app.orm.Sequelize.INTEGER
          },
          "free": {
            "type": global.app.orm.Sequelize.INTEGER
          },
          "secotiza": {
            "type": global.app.orm.Sequelize.INTEGER
          }

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'TuristaReserva',
            hooks: {

            }
        });

        TuristaReserva.removeAttribute('id');

        TuristaReserva.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.TuristaReserva.belongsTo(models.Turista, {
              foreignKey: 'TuristaID'
          });
          models.TuristaReserva.belongsTo(models.Reserva, {
            foreignKey: 'ReservaID'
        })
      }
};
