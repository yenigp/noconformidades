'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Tareas = global.app.orm.sequelize.define('Tareas',
        lodash.extend({}, global.app.orm.mixins.attributes, {
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
                  return Tareas.findOne({
                    where: {nombre:value}
                  }).then((nombre) => {
                  if (nombre) {throw new Error('Error: el nombre' + ' ' + (value) + ' ' + 'ya existe')}
                })
                }
              }
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
          "FechaComienzo": {
              "type": global.app.orm.Sequelize.DATEONLY,
              "allowNull": false

          },
          "FechaFin": {
              "type": global.app.orm.Sequelize.DATEONLY,
              "allowNull": false

          },
          "estado": {
              "type": global.app.orm.Sequelize.ENUM,
              "values": ["registrada", "revisada", "cerrada"],
              "defaultValue": "registrada",

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
            tableName: 'Tareas',
            hooks: {

            }
        });
        Tareas.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Tareas.belongsTo(models.Usuario, {
              as: 'Creator'
            });
            models.Tareas.hasMany(models.AccionTarea, {
              foreignKey: 'TareasId'
            });
        }

};
