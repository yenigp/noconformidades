'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        {
          tableName: 'Norma',
          schema: 'noconformidades',
        },
        'nombre', 
        {
          "unique": true,
          "type": Sequelize.STRING(15),
          "allowNull": false
        }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('nombre')]);
  }
};
