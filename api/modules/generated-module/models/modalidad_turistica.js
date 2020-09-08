'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const ModalidadTuristica = global.app.orm.sequelize.define('ModalidadTuristica',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
          "nombre": {
              "type": global.app.orm.Sequelize.STRING,
              "allowNull": false,
              "validate":{
                "is": {
                  "args": /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/i,
                  "msg": "Sólo se aceptan letras"
                },
                "len":{
                  "args": [3,50],
                  "msg": "Mínimo 3 y máximo 50 carácteres"
                },
              }
          },
          "ServicioID": {
              "type": global.app.orm.Sequelize.INTEGER,
              "references": {
                  "model": "ProdServicio",
                  "key": "idservicio"
              },
              "onUpdate": "cascade",
              "onDelete": "cascade",
              "allowNull": false
          },
        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'modalidad_turistica',
            schema: 'noconformidades',
            hooks: {

            }
        });
        ModalidadTuristica.associate = function() {
            var models = global.app.orm.sequelize.models;
            models.ModalidadTuristica.belongsTo(models.ProdServicio);
        }

};
