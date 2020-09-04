'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Expediente = global.app.orm.sequelize.define('Expediente',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "noconformidad_codigo_nc": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "NoConformidad",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "evidencia": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "fechacreacion": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "fechacierre": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'expediente',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Expediente.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Expediente.belongsTo(models.NoConformidad);
        }

};
