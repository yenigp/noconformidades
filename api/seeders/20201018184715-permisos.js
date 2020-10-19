'use strict';

var tableName = "Permisos";

var centros = [
  {
    id: 1,
    nombre: 'canGet'
  },
  {
    id: 2,
    nombre: 'canPost'
  },
  {
    id: 3,
    nombre: 'canPath'
  },
  {
    id: 4,
    nombre: 'canDelete'
  },
  {
    id: 5,
    nombre: 'canSee'
  }
];
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert({tableName: "Permisos", schema: "noconformidades"}, centros)
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete(tableName);
  }
};
