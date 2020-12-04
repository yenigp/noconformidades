'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
const { stubFalse } = require('lodash');
exports.loadModel = function loadModel() {
    const Encuestas = global.app.orm.sequelize.define('Encuestas',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "unique": true,
                "validate": {
                    isUnique(value) {
                      return Encuestas.findOne({
                        where: {nombre:value}
                      }).then((nombre) => {
                        if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                      })
                    }
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
            "disponible": {
                "type": global.app.orm.Sequelize.BOOLEAN,
                "defaultValue": false
            },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "FechaInicio": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },
            "FechaTermino": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

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
            tableName: 'Encuestas',
            hooks: {
                beforeCreate: function(values, cb){
                    values.codigo = new Date().getTime().toString(32);
                    cb;
                }
            }
        });
        Encuestas.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Encuestas.belongsTo(models.Usuario, {
                as: 'Creator'
            });  
            models.Encuestas.hasMany(models.Preguntas, {
                as: 'Preguntas'
            });
        }

};
