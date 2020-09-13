'use strict';

var tableName = 'Usuario';

module.exports = {
  up: function(queryInterface, Sequelize) {
    var tableDefinition = {
        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        },
        "nombre": {
          "type": Sequelize.STRING

        },
        "apellidos": {
          "type": Sequelize.STRING

        },
        "correo": {
            "type": Sequelize.STRING

        },
        "usuario": {
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
            "type": Sequelize.STRING

        },
        "rol": {
            "type": Sequelize.ENUM,
            "values": ["admin", "espCalidad", "jefeMercado", "supervisor"],
            "defaultValue": "supervisor"
        },
        "CreatorId": {
            "type": Sequelize.INTEGER,
            "references": {
                "model": "Usuario",
                "key": "id"
            },
            "onUpdate": "cascade",
            "onDelete": "cascade"

        },
        /*"AreaId": {
          "type": Sequelize.INTEGER,
          "references": {
              "model": "Area",
              "key": "id"
          },
          "onUpdate": "cascade",
          "onDelete": "cascade"

        },*/
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
        .createTable({name: "tableName", tableName: "tableName", schema: "sgnc"}, tableDefinition);
},
down: function(queryInterface) {
    return queryInterface.dropTable(tableName);
}
};
