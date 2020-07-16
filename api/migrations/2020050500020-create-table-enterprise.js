'use strict';

var tableName = 'Enterprise';

module.exports = {
    up: function(queryInterface, Sequelize) {
        var tableDefinition = {
            "id": {
                "type": Sequelize.INTEGER,
                "primaryKey": true,
                "autoIncrement": true
            },
            "image": {
                "type": Sequelize.STRING

            },
            "name": {
                "type": Sequelize.STRING,
                "allowNull": false,
                unique: true

            },
            "description": {
                "type": Sequelize.STRING

            },
            "CreatorId": {
                "type": Sequelize.INTEGER,
                "references": {
                    "model": "Person",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade"

            },
            "tags": {
                "type": Sequelize.TEXT('long')

            },

            "createdAt": {
                "type": Sequelize.DATE
            },
            "updatedAt": {
                "type": Sequelize.DATE
            },
            "deletedAt": {
                "type": Sequelize.DATE
            }
        };
        return queryInterface
            .createTable(tableName, tableDefinition);
    },
    down: function(queryInterface) {
        return queryInterface.dropTable(tableName);
    }
};