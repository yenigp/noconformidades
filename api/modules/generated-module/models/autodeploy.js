'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Autodeploy = global.app.orm.sequelize.define('Autodeploy',
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
            "PersonId": {
                "type": global.app.orm.Sequelize.INTEGER,
                "references": {
                    "model": "Person",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

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
            tableName: 'Autodeploy',
            hooks: {

            }
        });
    Autodeploy.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Autodeploy.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};