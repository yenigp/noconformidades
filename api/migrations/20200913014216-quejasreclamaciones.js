'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "NoConformidadId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "NoConformidad",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"
      },
      "ModalidadTuristicaId": {
        "type": Sequelize.INTEGER,
        "references": {
          "model": "ModalidadTuristica",
          "key": "id"
      },
      "onUpdate": "cascade",
      "onDelete": "cascade"

      },
      "clasificacion": {
        "type": Sequelize.ENUM,
        "values": ["interna", "externa"],
        "allowNull": false

      },
      "costonocalidad": {
        "type": Sequelize.FLOAT.UNSIGNED
      },
      "observacion": {
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
      .createTable({name: "QuejasReclamaciones", tableName: "QuejasReclamaciones", schema: "sgnc"}, tableDefinition);
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
