'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn({
      tableName: 'NoConformidad',
      schema: 'noconformidades'
    },
    'TipoId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'TipoNC',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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