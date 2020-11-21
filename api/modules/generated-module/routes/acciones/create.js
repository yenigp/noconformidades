'use strict';

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

  var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  //Función que devuelve el codigo de acción dado su id.
  async function BuscarCodigoPorTipoId(TipoId) {
    //esta funcion busca el codigo en la base de datos, dado un TipoId

    return await models.TipoAC.findByPk(TipoId).then(function (tipoX) {
      return tipoX.codigo;
    })
  }

  //Función que genera el código de una accion.
  async function GenerarCodigo(id, length) {
    id = id.toString();
    var tipoac = await BuscarCodigoPorTipoId(req.body.TipoId);
    var lengthInicial = tipoac.length + id.length;
    for (var i = length - lengthInicial; i > 0; i--) {
      id = "0" + id;
    }

    return tipoac + id;
  }


  return global
    .app.orm.sequelize.transaction(async function (t) {
      //Creando una no conformidad
      return models
        .Acciones
        .create({
          codigo: await GenerarCodigo(1, 6),
          TipoId: req.body.TipoId,
          AccionTomar: req.body.AccionTomar,
          estado: req.body.estado,
          FechaCumplimiento: req.body.FechaCumplimiento,
          CreatorId: req.body.CreatorId
        }, {
          transaction: t
        })
        .then(async function (data) {
          var id = data.id;
          var codigo = await GenerarCodigo(id, 6);
          return data.update({
            codigo: codigo,
          }, { transaction: t }).then(function () {
            return models.Acciones.findByPk(data.id, { transaction: t })
          })
        })
        .then(function (accionX) {
          return Sequelize.Promise.mapSeries(req.body.Tareas, 
            function(tareasX) {
              jsonAPIBody.data = accionX.toJSON();
              return models.Tareas.create(tareasX)
          .then(function (tareaX) {
              return models.AccionTarea.create({ AccionesId: accionX.id, TareasId: tareaX.id })
            })
          })
        })
    }).then(function (data) {
      //jsonAPIBody.data = data.toJSON();
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module: 'acciones/create',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(400)
        .json(jsonAPI.processErrors(error, req, { file: __filename }));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module: 'acciones/create',
        submodule: 'routes',
        stack: error.stack
      });
      return res.status(500)
        .json(jsonAPI.processErrors(error, req, { file: __filename }));
    });
};

