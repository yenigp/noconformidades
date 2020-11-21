'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
const { stubFalse } = require('lodash');
exports.loadModel = function loadModel() {
    const Categorias = global.app.orm.sequelize.define('Categorias',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "validate":{
                    "len":{
                      "args": [3,50],
                      "msg": "El nombre debe contener como mínimo 3 carácteres."
                    },
                  },
                "allowNull": false

            },
            "descripcion": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                "validate":{
                    "len":{
                      "args": [10,255],
                      "msg": "Mínimo 10 y máximo 255 carácteres"
                    },
                }
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
            tableName: 'Categorias',
            hooks: {

            }
        });
        Categorias.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Categorias.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Categorias.belongsTo(models.Encuestas, {
                foreignKey: 'EncuestaId'
            });
        }

};
