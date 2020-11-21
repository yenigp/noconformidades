'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn({
      tableName: 'NoConformidad',
      schema: 'noconformidades'
    },
    'status',
    {
      "type": Sequelize.ENUM,
      "values": ["pendiente", "abierta", "analizando", "cerrado"],
      "defaultValue": "pendiente"
      
    }
  )
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
