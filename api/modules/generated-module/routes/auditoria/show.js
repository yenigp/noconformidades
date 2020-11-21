'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  if (req.loggedUser.RolId != 4) {
    if (req.auditoria.NoConformidad.SucursalId != req.loggedUser.SucursalId) {
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene permiso para gestionar Incidencias de esta Sucursal"
        }]
      })
    }   
  }
  jsonAPIBody.data = req.auditoria;
  return res.status(200).json(jsonAPIBody); // OK.
};
