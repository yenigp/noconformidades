'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const AgenciaMercado = global.app.orm.sequelize.define('AgenciaMercado',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "AgenciaViajesID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "AgenciaViajes",
                  "key": "idagenciaviajes"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "MercadoID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Mercado",
                  "key": "idmercado"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "activo": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1

            },
            "pordefecto": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_agenciamercado',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
