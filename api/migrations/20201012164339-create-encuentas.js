'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true
    },
      "nombre": {
        "type": Sequelize.STRING(100),
        "allowNull": false

      },
      "descripcion": {
        "type": Sequelize.STRING,
        "allowNull": false

      },
      "disponible": {
        "type": Sequelize.BOOLEAN,
        "defaultValue": false
      },
      "codigo": {
        "type": Sequelize.STRING,
        "allowNull": false
      },
      "FechaInicio": {
        "type": Sequelize.DATE,
        "allowNull": false
      },
      "FechaTermino": {
        "type": Sequelize.DATE,
        "allowNull": false
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
      .createTable({name: "Encuestas", tableName: "Encuestas", schema: "noconformidades"}, tableDefinition);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};