'use strict';

var tableName = "Usuario";
const bcrypt = require('bcryptjs');
var rounds = 8;

var password="123456"
var hashedpassword = bcrypt.hashSync(password, rounds);

var centros = [
  {
    id: 1,
    nombre: 'Administrador',
    apellidos: 'del Sistema',
    email: "admin@admin.admin",
    usuario: 'admin',
    password: hashedpassword,
    status: "enabled",
    rol: "admin",
    createdAt: "2020-04-05 22:23:17",
    lastLogout: "2020-04-05 22:23:17",
    updatedAt: "2020-04-05 22:23:17"
  }
];
module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert({tableName: "Usuario", schema: "noconformidades"}, centros)
  },
  down: function (queryInterface) {
    return queryInterface.bulkDelete(tableName);
  }
};
