'use strict';

var tableName = "RolPermiso";

var centros = [
  {
    id: 1,
    RolId: 1,
    PermisoId: 5
  },
  {
    id: 2,
    RolId: 2,
    PermisoId: 1
  },
  {
    id: 3,
    RolId: 2,
    PermisoId: 2
  },
  {
    id: 4,
    RolId: 2,
    PermisoId: 5
  },
  {
    id: 5,
    RolId: 3,
    PermisoId: 1
  },
  {
    id: 6,
    RolId: 3,
    PermisoId: 3
  },
  {
    id: 7,
    RolId: 3,
    PermisoId: 4
  },
  {
    id: 8,
    RolId: 3,
    PermisoId: 5
  },
  {
    id: 9,
    RolId: 4,
    PermisoId: 1
  },
  {
    id: 10,
    RolId: 4,
    PermisoId: 2
  },
  {
    id: 11,
    RolId: 4,
    PermisoId: 3
  },
  {
    id: 12,
    RolId: 4,
    PermisoId: 4
  },
  {
    id: 13,
    RolId: 4,
    PermisoId: 5
  },
  {
    id: 14,
    RolId: 5,
    PermisoId: 1
  },
  {
    id: 15,
    RolId: 5,
    PermisoId: 2
  },
  {
    id: 16,
    RolId: 5,
    PermisoId: 3
  },
  {
    id: 17,
    RolId: 5,
    PermisoId: 4
  },
  {
    id: 18,
    RolId: 5,
    PermisoId: 5
  },
  {
    id: 19,
    RolId: 6,
    PermisoId: 1
  },
  {
    id: 20,
    RolId: 6,
    PermisoId: 2
  },
  {
    id: 21,
    RolId: 6,
    PermisoId: 3
  },
  {
    id: 22,
    RolId: 6,
    PermisoId: 4
  },
  {
    id: 23,
    RolId: 6,
    PermisoId: 5
  },
  {
    id: 24,
    RolId: 7,
    PermisoId: 1
  },
  {
    id: 25,
    RolId: 7,
    PermisoId: 2
  },
  {
    id: 26,
    RolId: 7,
    PermisoId: 3
  },
  {
    id: 27,
    RolId: 7,
    PermisoId: 5
  },
  {
    id: 28,
    RolId: 8,
    PermisoId: 1
  },
  {
    id: 29,
    RolId: 8,
    PermisoId: 2
  },
  {
    id: 30,
    RolId: 8,
    PermisoId: 5
  },
  {
    id: 31,
    RolId: 9,
    PermisoId: 1 
  },
  {
    id: 32,
    RolId: 9,
    PermisoId: 2
  },
  {
    id: 33,
    RolId: 9,
    PermisoId: 5
  },
  {
    id: 34,
    RolId: 10,
    PermisoId: 1
  },
  {
    id: 35,
    RolId: 10,
    PermisoId: 3
  },
  {
    id: 36,
    RolId: 10,
    PermisoId: 5
  }
];
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert({tableName: "RolPermiso", schema: "noconformidades"}, centros)
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete(tableName);
  }
};