'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Db = global.app.orm.sequelize.define('Db',
        lodash.extend({}, global.app.orm.mixins.attributes, {
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
            "type": {
                "type": global.app.orm.Sequelize.STRING

            },
            "user": {
                "type": global.app.orm.Sequelize.STRING

            },
            "cipheredPass": {
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
            tableName: 'Db',
            hooks: {

            }
        });
    Db.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Db.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

};