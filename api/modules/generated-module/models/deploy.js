'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Deploy = global.app.orm.sequelize.define('Deploy',
        lodash.extend({}, global.app.orm.mixins.attributes, {
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
            "domain": {
                "type": global.app.orm.Sequelize.STRING

            },
            "branch": {
                "type": global.app.orm.Sequelize.STRING

            },
            "environment": {
                "type": global.app.orm.Sequelize.STRING

            },
            "autodeploy": {
                "type": global.app.orm.Sequelize.STRING

            },
            "serverIp": {
                "type": global.app.orm.Sequelize.STRING

            },
            "userIp": {
                "type": global.app.orm.Sequelize.STRING

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
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "tags": {
                "type": global.app.orm.Sequelize.TEXT('long')

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Deploy',
            hooks: {

            }
        });
    Deploy.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Deploy.belongsTo(models.Person, {
            as: 'Creator'
        });
        models.Deploy.belongsTo(models.Enterprise, {
            // as: 'Enterprise'
        });
        models.Deploy.belongsTo(models.Project, {
            // as: 'Project'
        });
        models.Deploy.hasMany(models.WebClient);
    }

};