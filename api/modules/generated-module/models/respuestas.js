'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
const { stubFalse } = require('lodash');
exports.loadModel = function loadModel() {
    const Respuestas = global.app.orm.sequelize.define('Respuestas',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "texto": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false
        
              },
              "PreguntaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Preguntas",
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
            tableName: 'Respuestas',
            hooks: {

            }
        });
        Respuestas.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Respuestas.belongsTo(models.Usuario, {
                as: 'Creator'
            }); 
            models.Respuestas.belongsTo(models.Preguntas, {
                foreignKey: 'PreguntaId'
            }); 
        }

};
