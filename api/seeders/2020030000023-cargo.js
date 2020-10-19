'use strict';

var tableName = "sc_cargo";
//const bcrypt = require('bcryptjs');
//var rounds = 8;

//var password="123456"
//var hashedpassword = bcrypt.hashSync(password, rounds);

var centros = [
  {
    id: 1,
    area_id: 1,
    nombre: Especialista Principal,
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
