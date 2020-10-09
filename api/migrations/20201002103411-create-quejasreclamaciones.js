'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true

      },
      "NoConformidadId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "NoConformidad",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"
      },
      "ServicioId": {
        "type": Sequelize.INTEGER,
        "comment": "The foreing object that will have the ProdServicio.",
        "allowNull": false

      },
      "ProductoId": {
        "type": Sequelize.INTEGER,
        "comment": "The foreing object that will have the Producto.",
        "allowNull": false

      },
      "TuristaId": {
        "type": Sequelize.INTEGER,
        "comment": "The foreing object that will have the Turista.",
        "allowNull": false

      },
      "ReservaId": {
        "type": Sequelize.INTEGER,
        "comment": "The foreing object that will have the Area.",
        "allowNull": false

      },
      "clasificacion": {
        "type": Sequelize.ENUM,
        "values": ["interna", "externa"],
        "allowNull": false

      },
      "costonocalidad": {
        "type": Sequelize.FLOAT
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
      .createTable({name: "QuejasReclamaciones", tableName: "QuejasReclamaciones", schema: "noconformidades"}, tableDefinition);
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