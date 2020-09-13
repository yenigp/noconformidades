'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true
    },
      "QuejasReclamacionesId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "QuejasReclamaciones",
            "key": "NoConformidadId"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"
      },
      "codigo": {
        "type": Sequelize.STRING(10),
        "allowNull": false

      },
      "estado": {
        "type": Sequelize.ENUM,
        "values": ["aprobado", "denegado"],
        "allowNull": false

      },
      "fechaaprobacion": {
        "type": Sequelize.DATE

      },
      "conclusiones": {
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
      .createTable({name: "Dictamen", tableName: "Dictamen", schema: "sgnc"}, tableDefinition);
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
