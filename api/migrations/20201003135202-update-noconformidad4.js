'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn({
      tableName: 'NoConformidad',
      schema: 'noconformidades'
    },
    'tipo',
    {
      type: Sequelize.STRING,
      allowNull: false
    }
  )
},


  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('tipo', {
      tableName: 'NoConformidad',
      schema: 'noconformidades'
    });
  }
};
