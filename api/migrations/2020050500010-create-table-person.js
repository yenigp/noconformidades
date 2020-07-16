'use strict';

var tableName = 'Person';

module.exports = {
    up: function(queryInterface, Sequelize) {
        var tableDefinition = {
            "id": {
                "type": Sequelize.INTEGER,
                "primaryKey": true,
                "autoIncrement": true
            },
            "email": {
                "type": Sequelize.STRING

            },
            "gitUser": {
                "type": Sequelize.STRING

            },
            "password": {
                "type": Sequelize.STRING

            },
            "status": {
                "type": Sequelize.ENUM,
                "values": ["enabled", "blocked"],
                "defaultValue": "enabled"
            },
            "lastLogout": {
                "type": Sequelize.STRING

            },
            "description": {
                "type": Sequelize.TEXT('long')

            },
            "rol": {
                "type": Sequelize.ENUM,
                "values": ["programador", "admin"],
                "defaultValue": "programador"
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