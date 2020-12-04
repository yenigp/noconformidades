'use strict';

var moment = require('moment');
const sucursal = require('../sucursal');

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
    var tiponc = await BuscarCodigoPorTipoId(req.body.TipoId);
    var proceso = await BuscarProcesoPorProcesoId(2);
    var today = new Date();
    var year = (today.getFullYear()).toString().slice(2,4);
    var cabecera=tiponc + proceso + year;
    var lengthInicial=cabecera.length+id.length;
    for (var i = length - lengthInicial; i > 0; i--) {
      id = "0" + id;
    }
        
      return cabecera+ id;
    }
     
    //Función que genera el código de una no conformidad.
    async function GenerarCodigoReal(id, length) {
      id = id.toString();
      var tiponc = await BuscarCodigoPorTipoId(req.body.TipoId);
      var proceso = await BuscarProcesoPorProcesoId(req.body.ProcesoId);
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
          ProcesoId: req.body.ProcesoId,
          NormaId: req.body.NormaId,
          codigo: await GenerarCodigo(1,10),
          FechaRegistro: req.body.FechaRegistro,
          FechaIdentificacion: req.body.FechaIdentificacion,
          FechaTermino: fechatermino,
          TipoId: req.body.TipoId,
          descripcion: req.body.descripcion,
          evidencia: req.body.evidencia,
          CreatorId: req.loggedUser.id,
          SucursalId: req.loggedUser.SucursalId, 
        },{transaction:t})
    })
    .then(async function (noconformidad) {
      var tiponc = await BuscarCodigoPorTipoId(req.body.TipoId);
      var id=noconformidad.id;
      var codigo=await GenerarCodigo(id,10);
      return noconformidad.update({
        codigo: codigo,
      }).then(function(){
      return models.NoConformidad.findByPk(noconformidad.id)
      }).then(function () {
        /*Si el tipo de no conformidad enviado por el usuario su código es 
          auditoria interna entonces se crea una Queja y Reclamación.*/
          if (tiponc === 'AI') {
            return models
            .Auditoria
            .create ({
              NoConformidadId: noconformidad.id,
              observacion: req.body.observacion,
              CreatorId: noconformidad.CreatorId    
            })       
        }/*Si el tipo de no conformidad enviado por el usuario su código es 
        quejas y reclamaciones entonces se crea una Queja y Reclamación.*/
        else if (tiponc === 'QR'){
          return models
            .QuejasReclamaciones
            .create({
              NoConformidadId: noconformidad.id,
              ProductoId: req.body.ProductoId,
              ServicioId: req.body.ServicioId,
              ReservaId: req.body.ReservaId,
              tipo: req.body.tipo,
              clasificacion: req.body.clasificacion,
              CostoNoCalidad: req.body.CostoNoCalidad,
              observacion: req.body.observacion,
              CreatorId: noconformidad.CreatorId
            })
          }/*Si el tipo de no conformidad enviado por el usuario su código es 
          incidencia entonces se crea una Incidencia.*/
          else if (tiponc === 'RI'){
            if (req.body.CausaInvestigacion === false) {
              noconformidad.update({
                status: "cerrado",
              }).then(function(){
              return models.NoConformidad.findByPk(noconformidad.id)
              })
            }
            return models
            .Incidencia
            .create({
              NoConformidadId: noconformidad.id,
              tipo: req.body.tipo,
              CausaInvestigacion: req.body.CausaInvestigacion,
              CreatorId: noconformidad.CreatorId
            })
          }
      })
    })
    .then(function (data) {
        //Creando Expediente
        console.log(data);
        if (data.TipoId === 3) {
          jsonAPIBody.data = data.toJSON()
          return models
          .Expediente
          .create({
            NoConformidadId: data.id,
            evidencia: req.body.evidencia,
            estado: req.body.estado,
            CreatorId: data.CreatorId
          }) 
        }else if (data.TipoId != 3) {
            jsonAPIBody.data = data.toJSON()
          } else if (data.CausaInvestigacion === true){
          jsonAPIBody.data = noconformidad.toJSON()
          return models
            .Expediente
            .create({
              NoConformidadId: data.NoConformidadId,
              evidencia: req.body.evidencia,
              estado: req.body.estado,
              CreatorId: data.CreatorId
            })
          } else {
          jsonAPIBody.data = data.toJSON()
          return models
            .Expediente
            .create({
              NoConformidadId: data.NoConformidadId,
              evidencia: req.body.evidencia,
              estado: req.body.estado,
              CreatorId: data.CreatorId
            })
        }    
      return res.status(201).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'noconformidad/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'noconformidad/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
                .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

