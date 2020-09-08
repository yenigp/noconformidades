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
                "allowNull": true

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
