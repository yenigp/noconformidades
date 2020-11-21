'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tableDefinition = {
      "id": {
          "type": Sequelize.INTEGER,
          "primaryKey": true,
          "autoIncrement": true
      },
      "RolId": {
          "type": Sequelize.INTEGER,
          "references": {
            "model": "Roles",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      },
      "PermisoId": {
          "type": Sequelize.INTEGER,
          "references": {
            "model": "Permisos",
            "key": "id"
        },
        "onUpdate": "cascade",
        "onDelete": "cascade"

      }
  };
  return queryInterface
      .createTable({name: "RolPermiso", tableName: "RolPermiso", schema: "noconformidades"}, tableDefinition);
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
