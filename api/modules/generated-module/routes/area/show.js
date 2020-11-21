'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  if (req.loggedUser.RolId != 4) {
    if (req.area.SucursalId != req.loggedUser.SucursalId) {
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene permiso para gestionar áreas de esta Sucursal"
        }]
      })
    }   
  }
  jsonAPIBody.data = req.area;
  return res.status(200).json(jsonAPIBody); // OK.
};
