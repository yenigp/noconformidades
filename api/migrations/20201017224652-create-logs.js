'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
          "type": Sequelize.INTEGER,
          "primaryKey": true,
          "autoIncrement": true
      },
      "timestamp":{
        "type": Sequelize.DATE,
        "defaultValue": Sequelize.DATE.NOW

      },
      "username": {
        "type": Sequelize.STRING

      },
      "cargo": {
        "type": Sequelize.STRING

      },
      "UsuarioId": {
          "type": Sequelize.INTEGER

      },
      "HasUser": {
          "type": Sequelize.BOOLEAN

      },
      "path": {
          "type": Sequelize.STRING

      },
      "method": {
        "type": Sequelize.STRING

      },
      "protocol": {
          "type": Sequelize.STRING

      },
      "host": {
          "type": Sequelize.STRING

      },
      "query": {
          "type": Sequelize.JSON

      },
      "headers": {
          "type": Sequelize.JSON

      },
      "error": {
        "type": Sequelize.JSON

      },
      "wasFinished": {
        "type": Sequelize.BOOLEAN

      },
      "delay": {
        "type": Sequelize.NUMERIC

      },
      "StatusCode": {
        "type": Sequelize.NUMERIC

      },
      "response": {
        "type": Sequelize.JSON

      }
  };
  return queryInterface
      .createTable({name: "SystemLog", tableName: "SystemLog", schema: "noconformidades"}, tableDefinition);
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
