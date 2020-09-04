'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Pais = global.app.orm.sequelize.define('Pais',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "idpais": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true
          },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING

            },
            "descripcion": {
                "type": global.app.orm.Sequelize.STRING

            },
            "ididio": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "codigo_telefono": {
                "type": global.app.orm.Sequelize.INTEGER

            },
            "activo": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": "1"

            },
            "codigo2": {
                "type": global.app.orm.Sequelize.STRING

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'e_pais',
            schema: 'noconformidades',
            hooks: {

            }
        });

};
