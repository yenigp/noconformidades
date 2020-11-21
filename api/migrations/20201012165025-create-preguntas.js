'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true
    },
      "texto": {
        "type": Sequelize.STRING,
        "allowNull": false

      },
      "CategoriaId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Categorias",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      },
      "EncuestaId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Encuestas",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      },
      "estado": {
        "type": Sequelize.ENUM,
        "values": ['abierta', 'cerrada'],
        "defaultValue": "abierta"
      },
      "posicion": {
        "type": Sequelize.INTEGER,
        "defaultValue": 0
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
      .createTable({name: "Preguntas", tableName: "Preguntas", schema: "noconformidades"}, tableDefinition);
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