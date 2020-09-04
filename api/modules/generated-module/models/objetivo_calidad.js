'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const ObjetivoCalidad = global.app.orm.sequelize.define('ObjetivoCalidad',
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
            "fechacomienzo": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "valoralcanzar": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "cumplimientoobjetivo": {
                "type": global.app.orm.Sequelize.DOUBLE,
                "allowNull": false

            },
            "periodicidadseguimiento": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "comentario": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "responsableseguimiento": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'objetivo_calidad',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
