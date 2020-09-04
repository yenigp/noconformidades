'use strict';
var lodash = require('lodash');
const bcrypt = require('bcryptjs');
exports.loadModel = function loadModel() {
    const Accciones = global.app.orm.sequelize.define('Accciones',
        lodash.extend({}, global.app.orm.mixins.attributes, {
          "id": {
            "type": global.app.orm.Sequelize.INTEGER,
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
          },
            "codigo_ac": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "acciontomar": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },
            "fechacreacion": {
                "type": global.app.orm.Sequelize.DATEONLY,
                "allowNull": false

            },
            "discr": {
                "type": global.app.orm.Sequelize.STRING,
                "allowNull": false

            },

        }), {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: 'acciones',
            schema: 'noconformidades',
            hooks: {

            }
        });
};
