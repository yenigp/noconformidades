'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const MercadoPais = global.app.orm.sequelize.define('MercadoPais',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "PaisID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Pais",
                  "key": "idpais"
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

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_mercadopais',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
