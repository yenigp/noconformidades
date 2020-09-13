'use strict';

var tableName = 'Area';

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
        "CreatorId": {
            "type": Sequelize.INTEGER,
            "references": {
                "model": "Usuario",
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
        .createTable({name: "Area", tableName: "Area", schema: "sgnc"}, tableDefinition);
},
down: function(queryInterface) {
    return queryInterface.dropTable(tableName);
}
};