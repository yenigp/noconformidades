'use strict';

var tableName = "Roles";

var centros = [
  {
    id: 1,
    nombre: 'Usuario',
    descripcion: 'Rol por defecto para todos los usuarios que no se le asigna un rol'
  },
  {
    id: 2,
    nombre: 'Auditor',
    descripcion: 'Rol con permisos registrar las no conformidades de tipo auditoría'
  },
  {
    id: 3,
    nombre: 'JefeProceso',
    descripcion: 'Rol con permisos para actualizar las no conformidades'
  },
  {
    id: 4,
    nombre: 'SuperAdmin',
    descripcion: 'Rol de Administración del Sistema'
  },
  {
    id: 5,
    nombre: 'AdminSucursal',
    descripcion: 'Rol con permisos para administrar los usuarios de una Sucursal'
  },
  {
    id: 6,
    nombre: 'AdminEmpresa',
    descripcion: 'Rol con permisos para administrar el sistema a nivel de Casa Matriz'
  },
  {
    id: 7,
    nombre: 'EspCalidadSucursal',
    descripcion: 'Rol con permisos para registrar las quejas y reclamaciones de una Sucursal'
  },
  {
    id: 8,
    nombre: 'EspCalidadEmpresa',
    descripcion: 'Rol con permisos para visualizar el comportamiento de las no conformidades'
  },
  {
    id: 9,
    nombre: 'Supervisor',
    descripcion: 'Rol con permisos para registrar las no conformidades de tipo incidencia'
  },
  {
    id: 10,
    nombre: 'DirectorSucursal',
    descripcion: 'Rol con permisos para actualizar no conformidades'
  }
];
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert({tableName: "Roles", schema: "noconformidades"}, centros)
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete(tableName);
  }
};