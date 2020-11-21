'use strict';



module.exports = function (req, res) {
	var jsonAPI = global.app.utils.jsonAPI;

  if (req.loggedUser.Rol != 4) {
    if (req.usuario.SucursalId != req.loggedUser.SucursalId){
      return res.status(403).json({
        errors: [{
          field: "Autorización",
          title: "Usted no tiene acceso a eliminar dicho Usuario"
        }]
      })
    }
  } 
  return req
    .usuario
    .destroy()
    .then(function () {
      return res.sendStatus(204); // No Content.
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'usuario/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};
