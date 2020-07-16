'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Snippets = global.app.orm.sequelize.define('Snippets',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "snippet": {
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
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "tags": {
                "type": global.app.orm.Sequelize.TEXT('long')

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Snippets',
            hooks: {

            }
        });
    Snippets.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Snippets.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};