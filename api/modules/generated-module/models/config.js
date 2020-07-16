'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Config = global.app.orm.sequelize.define('Config',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "DeployId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Deploy",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            },
            "program": {
                "type": global.app.orm.Sequelize.STRING

            },
            "version": {
                "type": global.app.orm.Sequelize.STRING

            },
            "commands": {
                "type": global.app.orm.Sequelize.TEXT('long')

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
            tableName: 'Config',
            hooks: {

            }
        });
    Config.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Config.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};