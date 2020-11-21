'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  if (req.loggedUser.RolId != 4) {
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene permiso ver los roles de los usuarios del sistema"
        }]
      })
  }
  jsonAPIBody.data = req.roles;
  return res.status(200).json(jsonAPIBody); // OK.
};
