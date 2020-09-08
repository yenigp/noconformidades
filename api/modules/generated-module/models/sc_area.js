'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const SCArea = global.app.orm.sequelize.define('SCArea',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "nombre": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": false,
              "validate":{
                "is": {
                  "args": /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/i,
                  "msg": "Sólo se aceptan letras"
                },
                "len":{
                  "args": [3,50],
                  "msg": "Mínimo 3 y máximo 50 carácteres"
                },
              }
          },
          "SucursalID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Sucursal",
                  "key": "idagenciaviajes_tmp"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'sc_area',
            schema: 'noconformidades',
            hooks: {

            }
        });
        SCArea.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.SCArea.belongsTo(models.Sucursal);
        }

};
