'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addIndex({
        tableName: 'Usuario',
        schema: 'sgnc'
      },
        ['nombre', 'apellidos'],
          {
            indexName: 'SuperDuperIndex',
            indicesType: 'UNIQUE'
          }
      )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
