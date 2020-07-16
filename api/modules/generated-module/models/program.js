'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Program = global.app.orm.sequelize.define('Program',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "name": {
                "type": global.app.orm.Sequelize.STRING

            },
            "version": {
                "type": global.app.orm.Sequelize.STRING

            },
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "CreatorId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Person",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Program',
            hooks: {

            }
        });
    Program.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Program.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};