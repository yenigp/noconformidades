'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const SCLog = global.app.orm.sequelize.define('SCLog',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
            "codigo": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "usuario": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "accion": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "url": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "ip": {
                "type": global.app.orm.Sequelize.TEXT,
                "allowNull": false

            },
            "fecha": {
                "type": global.app.orm.Sequelize.DATE,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'sc_log',
            schema: 'noconformidades',
            hooks: {

            }
        });


};
