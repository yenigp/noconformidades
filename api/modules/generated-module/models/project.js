'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Project = global.app.orm.sequelize.define('Project',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "name": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                unique: true

            },
            "type": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["client", "api", "app", "extra"],
                "defaultValue": "client"
            },
            "git": {
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
            tableName: 'Project',
            hooks: {

            }
        });
    Project.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Project.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};