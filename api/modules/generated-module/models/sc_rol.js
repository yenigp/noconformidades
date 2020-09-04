'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const SCRol = global.app.orm.sequelize.define('SCRol',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "rol": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": false

          },
          "descripcion": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": false

          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'sc_rol',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
