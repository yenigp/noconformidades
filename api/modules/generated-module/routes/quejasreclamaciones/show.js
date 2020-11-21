'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  if (req.loggedUser.RolId != 4) {
    if (req.quejasreclamaciones.NoConformidad.SucursalId != req.loggedUser.SucursalId) {
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene permiso para gestionar no conformidades de esta Sucursal"
        }]
      })
    }   
  }
  jsonAPIBody.data = req.quejasreclamaciones;
  return res.status(200).json(jsonAPIBody); // OK.
};
