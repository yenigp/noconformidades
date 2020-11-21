'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const NCAcciones = global.app.orm.sequelize.define('NCAcciones',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "NoConformidadId": {
            "type": global.app.orm.Sequelize.INTEGER,
            "references": {
                "model": "NoConformidad",
                "key": "id"
            },
            "onUpdate": "cascade",
            "onDelete": "cascade"
  
        },
        "AccionesId": {
          "type": global.app.orm.Sequelize.INTEGER,
          "references": {
              "model": "Acciones",
              "key": "id"
          },
          "onUpdate": "cascade",
          "onDelete": "cascade"

        }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'NCAcciones',
            hooks: {

            }
        });
        NCAcciones.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.NCAcciones.belongsTo(models.NoConformidad, {
              foreignKey: 'NoConformidadId'
          });
          models.NCAcciones.belongsTo(models.Acciones, {
            foreignKey: 'AccionesId'
        })
      }
  }
