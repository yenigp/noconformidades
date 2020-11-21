'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Proceso = global.app.orm.sequelize.define('Proceso',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "codigo": {
            "type": global.app.orm.Sequelize.STRING,
            "unique": true,
            "validate": {
              isUnique(value) {
                return Proceso.findOne({
                  where: {codigo:value}
                }).then((codigo) => {
                  if (codigo) {throw new Error('Error: el código' + ' ' + (value) + ' ' + 'ya existe')}
                })
              }
            },
            "allowNull": false,
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
                    return Proceso.findOne({
                      where: {nombre:value}
                    }).then((nombre) => {
                      if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                    })
                  }
                }
            },
            "tipo": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["realización", "estratégico", "de apoyo"],
                "allowNull": false

            },
            "JefeProceso": {
              "type": global.app.orm.Sequelize.INTEGER,
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
    
          }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Proceso',
            indexes: [
              {
                unique: true,
                fields: ['codigo', 'nombre']
              }
            ],
            hooks: {

            }
        });
        Proceso.associate = function() {
          var models = global.app.orm.sequelize.models;
          models.Proceso.belongsTo(models.Usuario, {
              as: 'Creator'
          });  
          models.Proceso.belongsTo(models.Usuario, {
            foreignKey: 'JefeProceso',
            //constraints: false
          }); 
          models.Proceso.hasMany(models.Indicadores, {
              as: "Indicadores",
              foreignKey: "ProcesoId"

          });
          models.Proceso.hasMany(models.NoConformidad, {
            as: "NoConformidad",
            foreignKey: "ProcesoId"
        });
        }  

};
