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
      "tipo": {
        "type": Sequelize.ENUM,
        "values": ["traslado", "alojamiento", "renta de autos", "vuelo", "restauración"],
        "allowNull": false
      },
      "causainvestigacion": {
        "type": Sequelize.BOOLEAN,
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
      .createTable({name: "Incidencia", tableName: "Incidencia", schema: "sgnc"}, tableDefinition);
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
