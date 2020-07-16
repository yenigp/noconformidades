'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const ToDo = global.app.orm.sequelize.define('ToDo',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "CreatorId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Person",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            },
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "ProjectId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Project",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            },
            "DeployId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Deploy",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

            },
            "tags": {
                "type": global.app.orm.Sequelize.TEXT('long')

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'ToDo',
            hooks: {

            }
        });
    ToDo.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.ToDo.belongsTo(models.Deploy, {
            as: 'Deploy'
        });
    }

};