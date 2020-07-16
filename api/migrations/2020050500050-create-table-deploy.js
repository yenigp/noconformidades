'use strict';

var tableName = 'Deploy';

module.exports = {
    up: function(queryInterface, Sequelize) {
        var tableDefinition = {
            "id": {
                "type": Sequelize.INTEGER,
                "primaryKey": true,
                "autoIncrement": true
            },
            "EnterpriseId": {
                "type": Sequelize.INTEGER,
                "references": {
                    "model": "Enterprise",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

            },
            "ProjectId": {
                "type": Sequelize.INTEGER,
                "references": {
                    "model": "Project",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

            },
            "domain": {
                "type": Sequelize.STRING

            },
            "branch": {
                "type": Sequelize.STRING

            },
            "environment": {
                "type": Sequelize.STRING

            },
            "autodeploy": {
                "type": Sequelize.STRING

            },
            "serverIp": {
                "type": Sequelize.STRING

            },
            "userIp": {
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
            "description": {
                "type": Sequelize.TEXT('long')
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