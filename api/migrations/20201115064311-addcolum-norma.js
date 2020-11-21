'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn({
      tableName: 'Norma',
      schema: 'noconformidades',
      },
      'status',
      {
        "type": Sequelize.ENUM,
        "values": ["enabled", "blocked"],
        "defaultValue": "enabled"
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
