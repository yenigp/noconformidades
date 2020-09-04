'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Indicadores = global.app.orm.sequelize.define('Indicadores',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "proceso_id": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "Proceso",
                  "key": "id"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "proposito": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "plazodesde": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "plazohasta": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "tipomedicion": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["Numérico", "Porcentaje", "Probabilidad", "Medida-Impacto"],
                "defaultValue": "enabled"

            },
            "cumplimientoindicador": {
                "type": global.app.orm.Sequelize.DOUBLE,
                "allowNull": false

            },
            "frecuenciaseguimiento": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "responsableseguimiento": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "frecuenciaanalisis": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "tipo": {
              "type": global.app.orm.Sequelize.ENUM,
              "values": ["Actividad", "Calidad", "Desempeño", "Gestión", "Objetivo", "Proceso", "Riesgo"],
              "defaultValue": "enabled"

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'indicadores',
            schema: 'noconformidades',
            hooks: {

            }
        });
        Indicadores.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Indicadores.belongsTo(models.Proceso);
        }

};
