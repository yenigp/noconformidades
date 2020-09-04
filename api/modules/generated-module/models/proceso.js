'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Proceso = global.app.orm.sequelize.define('Proceso',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "tipo": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": true

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'proceso',
            schema: 'noconformidades',
            hooks: {

            }
        });

};
