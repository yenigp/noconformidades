'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.addColumn({
    tableName: 'Area',
    schema: 'noconformidades',
    },
    'JefeMercado',
    {
      "type": Sequelize.STRING,
      "allowNull": true
    },
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
