'use strict';

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  //Función que genera el código de una accion.
  async function GenerarCodigo(id, length) {
    id = id.toString();
    var cabecera = "DCQR"
    var lengthInicial=cabecera.length+id.length;
    for (var i = length - lengthInicial; i > 0; i--) {
      id = "0" + id;
    }
  
    return cabecera+ id;
  }

  return global
    .app.orm.sequelize.transaction(async function (t) {
      return models
        .Dictamen
        .create({
          QuejasReclamacionesId: req.body.QuejasReclamacionesId,
          codigo: await GenerarCodigo(1,10),
          estado: req.body.estado,
          FechaAprobacion: req.body.FechaAprobacion,
          conclusiones: req.body.conclusiones,
          CreatorId: req.body.CreatorId
        });
    })
    .then(async function (data) {
      var id=data.QuejasReclamacionesId;
      var codigo=await GenerarCodigo(id,10);
      return data.update({
          codigo: codigo,
        }).then(function(){
        return models.Dictamen.findByPk(data.id)	  
        })     
    })  
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'dictamen/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'dictamen/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

