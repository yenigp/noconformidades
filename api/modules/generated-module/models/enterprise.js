'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Enterprise = global.app.orm.sequelize.define('Enterprise',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "image": {
                "type": global.app.orm.Sequelize.STRING

            },
            "name": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false,
                unique: true

            },
            "description": {
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
            "tags": {
                "type": global.app.orm.Sequelize.TEXT('long')

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Enterprise',
            hooks: {

            }
        });
    Enterprise.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Enterprise.belongsTo(models.Person, {
            as: 'Creator'
        });
        models.Enterprise.hasMany(models.Deploy);
    }

};