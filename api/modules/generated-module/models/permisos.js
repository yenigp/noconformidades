'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Permisos = global.app.orm.sequelize.define('Permisos',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "nombre": {
                "type": global.app.orm.Sequelize.JSON,
                "allowNull": false

            }

        }), {
            comment: 'A example model.',
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'Permisos',
            hooks: {

            }
        });
    Permisos.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Permisos.hasMany(models.RolPermiso, {
            foreignKey: 'PermisoId'
        });
    }

};