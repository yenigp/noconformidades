'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  /*if (req.loggedUser.RolId != 4) {
    if (req.incidencia.NoConformidad.SucursalId != req.loggedUser.SucursalId) {
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene permiso para gestionar Incidencias de esta Sucursal"
        }]
      })
    }   
  }*/
  jsonAPIBody.data = req.incidencia;
  return res.status(200).json(jsonAPIBody); // OK.
};
