'use strict';

var tableName = "Area";

var centros = [
  {
    id: 1,
    nombre: "Dirección de Informática y Comunicaciones",
    SucursalId: 101,
    CreatorId: 1
  }
];



module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert(tableName, centros)
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete(tableName);
  }
};
