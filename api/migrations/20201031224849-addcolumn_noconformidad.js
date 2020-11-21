'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn({
      tableName: 'NoConformidad',
      schema: 'noconformidades'
    },
    'EspCalidad',
    {
      "type": Sequelize.INTEGER  
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

