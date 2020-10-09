'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true
    },
      "codigo": {
        "type": Sequelize.STRING(8),
        "allowNull": false

      },
      "tipo": {
        "type": Sequelize.ENUM,
        "values": ["Acción Correctiva", "Acción Mejora"],
        "defaultValue": "Acción Correctiva"
      },
      "acciontomar": {
        "type": Sequelize.STRING

      },
      "estado": {
        "type": Sequelize.ENUM,
        "values": ["registrada", "revisada", "aprobada", "cerrada"],
        "defaultValue": "registrada"

      },
      "fechacumplimiento": {
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
      .createTable({name: "Acciones", tableName: "Acciones", schema: "noconformidades"}, tableDefinition);
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
