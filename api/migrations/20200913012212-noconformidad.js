'use strict';

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
      "NormaId": {
          "type": Sequelize.INTEGER,
          "references": {
            "model": "Norma",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      },
      "codigo": {
          "type": Sequelize.STRING(10),
          "allowNull": false

      },
      "fecharegistro": {
          "type": Sequelize.DATE,
          "allowNull": false

      },
      "fechaidentificacion": {
        "type": Sequelize.DATE,
        "allowNull": false

      },
      "fechatermino": {
          "type": Sequelize.DATE,
          "allowNull": false

      },
      "tipo": {
          "type": Sequelize.ENUM,
          "values": ["Revisiones de las ofertas o contratos",
           "Reportes de Incidencias",
          "Quejas y Reclamaciones de clientes o prestatarios",
          "Encuentas de Satisfacción aplicada a los clientes",
          "Informe de Supervisores y del Guía asignado al servicio",
          "Resultados de inspecciones a prestatarios de servicios",
          "Resultados de auditoría internas al SGC de los procesos"],
          "allowNull": false

      },
      "description": {
          "type": Sequelize.STRING,
          "allowNull": false

      },
      "evidencia": {
          "type": Sequelize.STRING,
          "allowNull": false
      },
      "resultado": {
        "type": Sequelize.ENUM,
        "values": ["procede", "no procede"],
        "allowNull": false
      },
      "estado": {
        "type": Sequelize.ENUM,
        "values": ["identificado", "análizado", "corregido", "seguiendo", "cerrado"],
        "defaultValue": "identificado"
      },
      "fecharevision": {
        "type": Sequelize.DATE,
        "allowNull": false
      },
      "fechacierre": {
        "type": Sequelize.DATE,
        "allowNull": false
      },
      "AreaId": {
        "type": Sequelize.INTEGER,
        "references": {
            "model": "Area",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      },
      "gravedad": {
        "type": Sequelize.ENUM,
        "values": ["crítica", "mayor"],
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
      .createTable({name: "NoConformidad", tableName: "NoConformidad", schema: "sgnc"}, tableDefinition);
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
