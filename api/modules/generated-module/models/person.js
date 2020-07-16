'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Person = global.app.orm.sequelize.define('Person',
        lodash.extend({}, global.app.orm.mixins.attributes, {
            "email": {
                "type": global.app.orm.Sequelize.STRING

            },
            "gitUser": {
                "type": global.app.orm.Sequelize.STRING

            },
            "password": {
                "type": global.app.orm.Sequelize.STRING,
                set: function(password) {
                    var rounds = 8;
                    var hashedpassword = bcrypt.hashSync(password, rounds);
                    this.setDataValue('password', hashedpassword);
                }

            },
            "status": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["enabled", "blocked"],
                "defaultValue": "enabled"
            },
            "lastLogout": {
                "type": global.app.orm.Sequelize.STRING

            },
            "description": {
                "type": global.app.orm.Sequelize.TEXT('long')

            },
            "rol": {
                "type": global.app.orm.Sequelize.ENUM,
                "values": ["programador", "admin"],
                "defaultValue": "programador"
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
            tableName: 'Person',
            hooks: {

            }
        });
    Person.associate = function() {
        var models = global.app.orm.sequelize.models;
        models.Person.belongsTo(models.Person, {
            as: 'Creator'
        });
    }

    Person.prototype.isValidPassword = function(password) {
        var hashedPassword = this.get('password');
        return bcrypt.compareSync(password, hashedPassword);
    }

};