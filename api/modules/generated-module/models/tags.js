'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Tags = global.app.orm.sequelize.define('Tags',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "name": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                unique: true

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
            tableName: 'Tags',
            hooks: {

            }
        });
    Tags.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Tags.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};