'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Documentation = global.app.orm.sequelize.define('Documentation',
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
            "file": {
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
            tableName: 'Documentation',
            hooks: {

            }
        });
    Documentation.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Documentation.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};