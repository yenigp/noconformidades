'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
const { includes } = require('lodash');
const sucursal = require('../routes/sucursal');
const area = require('../routes/area');
exports.loadModel = function loadModel() {
    const Area = global.app.orm.sequelize.define('Area',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "nombre": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": false,
              "validate":{
                "len":{
                  "args": [3,50],
                  "msg": "El nombre debe contener como mínimo 3 carácteres."
                },
              }
          },
          "CreatorId": {
            "type": global.app.orm.Sequelize.INTEGER,
            "references": {
                "model": "Usuario",
                "key": "id"
            },
            "onUpdate": "cascade",
            "onDelete": "cascade"

        },
        "JefeMercado": {
          "type": global.app.orm.Sequelize.INTEGER,
          "allowNull": false
  
        },
        "SucursalId": {
          "type": global.app.orm.Sequelize.INTEGER,
          "comment": "The foreing object that will have the Area.",
          "allowNull": false,
          "noUpdate": true

      },
        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Area',
            hooks: {

            }
        });
        Area.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.Area.belongsTo(models.Usuario, {
              as: 'Creator'
          });       
          models.Area.belongsTo(models.Usuario, {
            foreignKey: 'JefeMercado',
            //constraints: false
          });    
          models.Area.belongsTo(models.Sucursal, {
              foreignKey: 'SucursalId',
              constraints: false
          });
      }
};
