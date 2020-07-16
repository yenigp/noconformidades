'use strict';

var tableName = 'WebClient';

module.exports = {
    up: function(queryInterface, Sequelize) {
        var tableDefinition = {
            "id": {
                "type": Sequelize.INTEGER,
                "primaryKey": true,
                "autoIncrement": true
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
            "DeployId": {
                "type": Sequelize.INTEGER,
                "references": {
                    "model": "Deploy",
                    "key": "id"
                },
                "onUpdate": "cascade",
                "onDelete": "cascade",
                "allowNull": false

            },
            "username": {
                "type": Sequelize.STRING

            },
            "cipheredPass": {
                "type": Sequelize.STRING

            },
            "rol": {
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