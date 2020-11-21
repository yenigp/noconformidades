'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
          "type": Sequelize.INTEGER,
          "primaryKey": true,
          "autoIncrement": true
      },
      "nombre":{
        "type": Sequelize.JSON

      },
      "descripcion": {
        "type": Sequelize.STRING
      }
  };
  return queryInterface
      .createTable({name: "Roles", tableName: "Roles", schema: "noconformidades"}, tableDefinition);
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
