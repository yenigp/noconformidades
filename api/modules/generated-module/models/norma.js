'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Norma = global.app.orm.sequelize.define('Norma',
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
        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'norma',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
