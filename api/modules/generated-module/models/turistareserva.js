'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const TuristaReserva = global.app.orm.sequelize.define('TuristaReserva',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "TuristaID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Turista",
                  "key": "idturista"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "ReservaID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Reserva",
                  "key": "idreserva"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_turistareserva',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
