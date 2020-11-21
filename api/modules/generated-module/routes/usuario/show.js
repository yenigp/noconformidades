'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  if (req.loggedUser.RolId != 4) {
    if (req.usuario.SucursalId != req.loggedUser.SucursalId) {
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene permiso para gestionar usuarios de esta Sucursal"
        }]
      })
    }   
  }
  jsonAPIBody.data = req.usuario;
  return res.status(200).json(jsonAPIBody); // OK.
};
