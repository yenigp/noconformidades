'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const SCCargo = global.app.orm.sequelize.define('SCCargo',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "area_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "SCArea",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": true
          },
          "nombre": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'sc_cargo',
            schema: 'noconformidades',
            hooks: {

            }
        });
        SCCargo.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.SCCargo.belongsTo(models.SCArea);
        }

};
