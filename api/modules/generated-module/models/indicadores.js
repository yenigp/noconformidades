'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Indicadores = global.app.orm.sequelize.define('Indicadores',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "ProcesoId": {
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
                "allowNull": false,
                "unique": true,
                "validate":{
                  "len":{
                    "args": [3,50],
                    "msg": "Mínimo 3 y máximo 50 carácteres"
                  },
                    isUnique(value) {
                      return Indicadores.findOne({
                        where: {nombre:value}
                      }).then((nombre) => {
                        if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                      })
                    }
                },
            },
            "proposito": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "PlazoDesde": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "PlazoHasta": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "TipoMedicion": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["Numérico", "Porcentaje", "Probabilidad", "Medida-Impacto"]

            },
            "cumplimiento": {
                "type": global.app.orm.Sequelize.FLOAT,
                "allowNull": false

            },
            "FrecuenciaSeguimiento": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "FrecuenciaAnalisis": {
                "type": global.app.orm.Sequelize.INTEGER,
                "allowNull": false

            },
            "TipoAnalisis": {
              "type": global.app.orm.Sequelize.ENUM,
              "values": ["Actividad", "Calidad", "Desempeño", "Gestión", "Objetivo", "Proceso", "Riesgo"],
              "defaultValue": "Calidad"

            },
            "CreatorId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Usuario",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"
      
            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Indicadores',
            hooks: {

            }
        });
        Indicadores.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Indicadores.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Indicadores.belongsTo(models.Proceso, {
                as: 'Proceso'
            });
            models.Indicadores.hasMany(models.IndicadoresObjetivos, {
                foreignKey: 'IndicadoresId'
            })
        }
};
