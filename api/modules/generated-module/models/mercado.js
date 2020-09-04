'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Mercado = global.app.orm.sequelize.define('Mercado',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idmercado": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true
          },
            "activo": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 1

            },
            "nombmercado": {
                "type": global.app.orm.Sequelize.STRING

            },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING

            },
            "fultmodif": {
                "type": global.app.orm.Sequelize.DATE,
                "defaultValue": global.app.orm.Sequelize.NOW
            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_mercado',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
