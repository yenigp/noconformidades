'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Acciones = global.app.orm.sequelize.define('Acciones',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "unique": true,
                /*"validate": {
                    isUnique(value) {
                      return Acciones.findOne({
                        where: {codigo:value}
                      }).then((codigo) => {
                        if (codigo) {throw new Error('Error: el código' + ' ' + (value) + ' ' + 'ya existe')}
                      })
                    }
                },*/
                "allowNull": false

            },
            "TipoId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "TipoAC",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false
              },
            "AccionTomar": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

              },
              "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["registrada", "revisada", "aprobada", "cerrada"],
                "defaultValue": "registrada"
        
              },
              "FechaCumplimiento": {
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
            tableName: 'Acciones',
            hooks: {

            }
        });
        Acciones.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.Acciones.belongsTo(models.Usuario, {
                as: 'Creator'
            }); 
            models.Acciones.belongsTo(models.TipoAC, {
                as: 'Tipo'
            });        
            models.Acciones.hasMany(models.AccionTarea, {
                foreignKey: 'AccionesId'
            });
            models.Acciones.hasMany(models.NCAcciones, {
                foreignKey: 'AccionesId'
            });
        }
};
