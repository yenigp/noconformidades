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
          "type": Sequelize.STRING(150),
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
      .createTable({name: "TipoMedicion", tableName: "TipoMedicion", schema: "noconformidades"}, tableDefinition);
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