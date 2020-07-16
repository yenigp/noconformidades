'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const WebClient = global.app.orm.sequelize.define('WebClient',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "ProjectId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Project",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

            },
            "EnterpriseId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Enterprise",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

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
            "username": {
                "type": global.app.orm.Sequelize.STRING

            },
            "cipheredPass": {
                "type": global.app.orm.Sequelize.STRING

            },
            "rol": {
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

            },
            "tags": {
                "type": global.app.orm.Sequelize.TEXT('long')

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'WebClient',
            hooks: {

            }
        });
    WebClient.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.WebClient.belongsTo(models.Person, {
            as: 'Creator'
        });
        models.WebClient.belongsTo(models.Deploy);
    }

};