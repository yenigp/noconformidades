'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
const { stubFalse } = require('lodash');
exports.loadModel = function loadModel() {
    const Resultados = global.app.orm.sequelize.define('Resultados',
        lodash.extend({}, global.app.orm.mixins.attributes, {
              "PreguntaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Preguntas",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"
        
              },
              "RespuestaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Respuestas",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"
        
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

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Resultado',
            hooks: {

            }
        });
        Resultados.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Resultados.belongsTo(models.Usuario, {
                as: 'Creator'
            }); 
            models.Resultados.belongsTo(models.Preguntas, {
                foreignKey: 'PreguntaId'
            }); 
            models.Resultados.belongsTo(models.Respuestas, {
                foreignKey: 'RespuestaId'
            }); 
        }

};
