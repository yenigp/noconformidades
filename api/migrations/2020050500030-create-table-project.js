'use strict';

var tableName = 'Project';

module.exports = {
    up: function(queryInterface, Sequelize) {
        var tableDefinition = {
            "id": {
                "type": Sequelize.INTEGER,
                "primaryKey": true,
                "autoIncrement": true
            },
            "name": {
                "type": Sequelize.STRING,
                "allowNull": false,
                unique: true

            },
            "type": {
                "type": Sequelize.ENUM,
                "values": ["client", "api", "app", "extra"],
                "defaultValue": "client"
            },
            "git": {
                "type": Sequelize.STRING

            },
            "description": {
                "type": Sequelize.TEXT('long')

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