'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const RolPermiso = global.app.orm.sequelize.define('RolPermiso',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "RolId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Roles",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
          "PermisoId": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Permisos",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'RolPermiso',
            hooks: {

            }
        });
        RolPermiso.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.RolPermiso.belongsTo(models.Roles, {
                foreignKey: 'RolId'
            });
            models.RolPermiso.belongsTo(models.Permisos, {
              foreignKey: 'PermisoId'
          })
        }
        
};
