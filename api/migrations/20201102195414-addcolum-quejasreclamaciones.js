'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn({
      tableName: 'QuejasReclamaciones',
      schema: 'noconformidades'
    },
    'tipo',
    {
      "type": Sequelize.ENUM,
      "values": ["queja", "reclamación"]
      
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
