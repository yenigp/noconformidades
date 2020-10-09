'use strict';

const { flatMap } = require("lodash");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "autoIncrement": true
    },
      "ProcesoId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Proceso",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"
      },
      "nombre": {
        "type": Sequelize.STRING(100),
        "allowNull": false

      },
      "propósito": {
        "type": Sequelize.STRING,
        "allowNull": false

      },
      "plazodesde": {
        "type": Sequelize.DATE

      },
      "plazohasta": {
        "type": Sequelize.DATE

      },
      "tipomedicion": {
        "type": Sequelize.ENUM,
        "values": ["Numérico", "Porcentaje", "Probabilidad", "Medida-Impacto"],
        "defaultValue": "Numérico"

      },
      "cumplimiento": {
        "type": Sequelize.FLOAT,
        "allowNull": false

      },
      "frecuenciaseguimiento":
      {
        "type": Sequelize.INTEGER,
        "allowNull": false

      },
      "frecuencianalisis":
      {
        "type": Sequelize.INTEGER,
        "allowNull": false

      },
      "tipoanalisis":
      {
        "type": Sequelize.ENUM,
        "values": ["Actividad", "Calidad", "Desempeño", "Gestión", "Objetivo", "Proceso", "Riesgo"],
        "defaultValue": "Calidad"
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
      .createTable({name: "Indicadores", tableName: "Indicadores", schema: "noconformidades"}, tableDefinition);
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
