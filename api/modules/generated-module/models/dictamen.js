'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Dictamen = global.app.orm.sequelize.define('Dictamen',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "quejasreclamacione_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "QuejasReclamaciones",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "codigodictamen": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "aprobado": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "allowNull": true

            },
            "fechaaprobacion": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "fecharecibido": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "conclusiones": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'dictamen',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Dictamen.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Dictamen.belongsTo(models.QuejasReclamaciones);
        }

};
