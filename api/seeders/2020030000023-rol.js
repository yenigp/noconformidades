'use strict';

var tableName = "sc_area";
//const bcrypt = require('bcryptjs');
//var rounds = 8;

//var password="123456"
//var hashedpassword = bcrypt.hashSync(password, rounds);

var centros = [
  {
    id: 1,
    rol: administrador,
    descripcion: ""
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
