'use strict';

var moment = require('moment');

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  //Función que devuelve el codigo de un tipo de no conformidad dado su id.
  async function BuscarCodigoPorTipoId(TipoId) {
    //esta funcion busca el codigo en la base de datos, dado un TipoId
    
     return await models.TipoNC.findByPk(TipoId).then(function(tipoX){
      return tipoX.codigo;
     })
  }
  
  //Función que devuelve el codigo de un proceso dado su id.
  async function BuscarProcesoPorProcesoId(ProcesoId) {
    console.log(ProcesoId)
     return await models.Proceso.findByPk(ProcesoId).then(function(procesoX){
      return procesoX.codigo;
     })

  }

  //Función que genera el código de una no conformidad.
  async function GenerarCodigo(id, length) {
  id = id.toString();
  var tiponc = await BuscarCodigoPorTipoId(2);
  var proceso = await BuscarProcesoPorProcesoId(1);
  var today = new Date();
  var year = (today.getFullYear()).toString().slice(2,4);
  var cabecera=tiponc + proceso + year;
  var lengthInicial=cabecera.length+id.length;
  for (var i = length - lengthInicial; i > 0; i--) {
    id = "0" + id;
  }
      
    return cabecera+ id;
  }

  //Se obtiene la fecha término de una no conformidad
  var fechatermino = moment().add(1, 'months');
  
  return global
    .app.orm.sequelize.transaction(async function (t) {
      return models
        .NoConformidad
        .create({
          ProcesoId: 1,
          codigo: await GenerarCodigo(1,10),
          FechaIdentificacion: req.body.FechaIdentificacion,
          FechaTermino: fechatermino,
          TipoId: 2,
          descripcion: req.body.descripcion,
          evidencia: req.body.evidencia,
          EspCalidad: req.body.EspCalidad,
          JefeProceso: req.body.JefeProceso,
          SucursalId: req.loggedUser.SucursalId,
          CreatorId: req.loggedUser.id
        },{
          transaction: t
        })
    })
    .then(async function (noconformidad) {
      var id= noconformidad.id;
      var codigo=await GenerarCodigo(id,10);
      noconformidad.update({
        codigo: codigo,
      }).then(function(){
        return models.NoConformidad.findByPk(noconformidad.id)
      });
      if (req.body.CausaInvestigacion === false) {
        noconformidad.update({
          status: "cerrado",
          FechaCierre: moment(),
        }).then(function(){
        return models.NoConformidad.findByPk(noconformidad.id)
        })
      } else {
        if (req.body.EspCalidad != null) {
          noconformidad.update({
            EspCalidad: req.body.EspCalidad,
            status: "abierta",
          }).then(function(){
          return models.NoConformidad.findByPk(noconformidad.id)
          })
        }
      }
      return models
      .Incidencia
      .create({
        NoConformidadId: noconformidad.id,
        tipo: req.body.tipo,
        CausaInvestigacion: req.body.CausaInvestigacion,
        CreatorId: noconformidad.CreatorId
      })
    })
    .then(async function(incidencia) {
      if (incidencia.CausaInvestigacion != false) {
        return models
        .Expediente
        .create({
          NoConformidadId: incidencia.NoConformidadId,
          evidencia: req.body.evidencia,
          CreatorId: incidencia.CreatorId
        }),
        jsonAPIBody.incidencia = incidencia.toJSON();  
      } else {
        jsonAPIBody.incidencia = incidencia.toJSON();  
      }
    })
    .then(function (data) {
      //jsonAPIBody.data = data.toJSON();
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'incidencia/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'incidencia/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

