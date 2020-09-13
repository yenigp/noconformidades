'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "AccionesId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Acciones",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"
      },
      "TareasId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Tareas",
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
      .createTable({name: "AccionTarea", tableName: "AccionTarea", schema: "sgnc"}, tableDefinition);
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
