'use strict';

var tableName = "Person";
const bcrypt = require('bcryptjs');
var rounds = 8;

var password="123456"
var hashedpassword = bcrypt.hashSync(password, rounds);

var centros = [
  {
    id: 1,
    gitUser: 'admin',
    status: "enabled",
    rol: "admin",
    email: "admin@admin.admin",
    password: hashedpassword,
    createdAt: "2020-04-05 22:23:17",
    lastLogout: "2020-04-05 22:23:17",
    updatedAt: "2020-04-05 22:23:17"
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