'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Acciones = global.app.orm.sequelize.define('Acciones',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "tipo": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["Acción Correctiva", "Acción Mejora"],
                "defaultValue": "Acción Correctiva",
                "allowNull": false

            },
            "acciontomar": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

              },
              "estado": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["registrada", "revisada", "aprobada", "cerrada"],
                "defaultValue": "registrada"
        
              },
              "fechacumplimiento": {
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
            /*models.Acciones.belongsToMany(models.Tareas, {
                through: models.AccionTarea 
            });
            models.Acciones.belongsToMany(models.NoConformidad, {
                through: models.NCAcciones
            });*/
        }
};
