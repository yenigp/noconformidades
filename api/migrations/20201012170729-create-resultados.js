'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true
    },
      "PreguntaId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Preguntas",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      },
      "RespuestaId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Respuestas",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

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
      .createTable({name: "Resultados", tableName: "Resultados", schema: "noconformidades"}, tableDefinition);
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