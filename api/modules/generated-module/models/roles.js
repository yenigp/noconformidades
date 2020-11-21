'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Roles = global.app.orm.sequelize.define('Roles',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "descripcion": {
                "type": global.app.orm.Sequelize.STRING

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Roles',
            hooks: {

            }
        });
    Roles.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Roles.hasMany(models.Usuario, {
            foreignKey: 'RolId'
        })
    }

};