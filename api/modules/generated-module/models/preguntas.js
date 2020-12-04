'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
const { stubFalse, get } = require('lodash');
exports.loadModel = function loadModel() {
    const Preguntas = global.app.orm.sequelize.define('Preguntas',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "texto": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "unique": true,
                "validate":{
                  "notNull": {
                    "msg": "Por favor, registre el texto"
                },
                  isUnique(value) {
                    return Preguntas.findOne({
                    where: {texto:value}
                    }).then((texto) => {
                     if (texto) {throw new Error('Error: el texto' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                   }
                },
        
              },
              "CategoriaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Categorias",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"
        
              },
              "EncuestaId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Encuestas",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"
        
              },
              "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ['abierta', 'cerrada'],
                "defaultValue": "abierta"
              },
              "posicion": {
                "type": global.app.orm.Sequelize.INTEGER,
                "defaultValue": 0
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
            tableName: 'Preguntas',
            hooks: {

            }
        });
        Preguntas.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Preguntas.belongsTo(models.Usuario, {
                as: 'Creator'
            }); 
            models.Preguntas.belongsTo(models.Categorias, {
                foreignKey: 'CategoriaId'
            }); 
            models.Preguntas.belongsTo(models.Encuestas, {
                foreignKey: 'EncuestaId'
            });
        }

};
