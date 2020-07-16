'use strict';
var lodash = require('lodash');

exports.loadModel = function loadModel() {
    const Contact = global.app.orm.sequelize.define('Contact',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "name": {
                "type": global.app.orm.Sequelize.STRING

            },
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "fkModel": {
                "type": global.app.orm.Sequelize.STRING

            },
            "fkId": {
                "type": global.app.orm.Sequelize.INTEGER

            }

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'Contact',
            hooks: {

            }
        });
    Contact.associate = function() {
        var models = global.app.orm.sequelize.models;

    }

};