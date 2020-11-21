'use strict';

var moment = require('moment');
const quejasreclamaciones = require('.');

module.exports = function (req, res) {

	var jsonAPI    = global.app.utils.jsonAPI;
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

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
      
       return await models.Proceso.findByPk(ProcesoId).then(function(procesoX){
        return procesoX.codigo;
       })
  
    }
     
    //Función que genera el código de una no conformidad.
    async function GenerarCodigo(id, length) {
      id = id.toString();
      var tiponc = await BuscarCodigoPorTipoId(3);
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

  return req
    .quejasreclamaciones
    .update(req.body)
    .then(function (quejasreclamaciones) {
      return models
        .QuejasReclamaciones
        .findByPk(quejasreclamaciones.id, {include:[{all:true}]});
    })
    .then(async function (quejasreclamaciones) {
      return quejasreclamaciones.NoConformidad.update({
        ProcesoId: req.body.ProcesoId,
        NormaId: req.body.NormaId,
        FechaRegistro: req.body.FechaRegistro,
        FechaIdentificacion: req.body.FechaIdentificacion,
        FechaTermino: fechatermino,
        TipoId: 3,
        descripcion: req.body.descripcion,
        evidencia: req.body.evidencia,
        resultado: req.body.resultado,
        estado: req.body.estado,
        FechaRevision: req.body.FechaRevision,
        FechaCierre: req.body.FechaCierre,
        AreaId: req.body.AreaId,
        gravedad: req.body.gravedad,
        JefeProceso: req.body.JefeProceso
      }).then(async function(){
        if (req.body.ProcesoId != null){
          quejasreclamaciones.NoConformidad.update({
            codigo: await GenerarCodigo(quejasreclamaciones.NoConformidadId,10)
          })       
        }
      return models.NoConformidad.findByPk(quejasreclamaciones.NoConformidadId)
      })
    })
    .then(function (noconformidad) {
      if (noconformidad.SucursalId != req.loggedUser.SucursalId){
        return res.status(403).json({
          errors: [{
            field: "Autorización",
            title: "Usted no tiene acceso a actualizar dicha No Conformidad"
          }]
        })
      } else {
        jsonAPIBody.noconformidad = noconformidad.toJSON();
        if (noconformidad.status === "abierta" && req.loggedUser.RolId === 7) {
          noconformidad.update({
            JefeProceso: req.body.JefeProceso,
            status: "analizando",
          }).then(function(){
          return models.NoConformidad.findByPk(noconformidad.id)
          })
        } else if (noconformidad.status === "analizando" && req.loggedUser.RolId === 3) {
          console.log(req.loggedUser.RolId)
          noconformidad.update({
            FechaRevision: req.body.FechaRevision,
            AreaId: req.body.AreaId,
            resultado: req.body.resultado,
            gravedad: req.body.gravedad,
            CostoNoCalidad: req.body.CostoNoCalidad
          }).then(function(){
          return models.NoConformidad.findByPk(noconformidad.id)
          })
          //Creando acciones
          return Sequelize.Promise.mapSeries(req.body.Acciones,
            console.log(req.body.Acciones), 
            function(accionesX) {
              return models.Acciones.findOrCreate(accionesX)
          .spread(function (accionX, created) {
              return models.NCAcciones.create({ NoConformidadId: noconformidad.id, AccionesId: accionX.id }),
              console.log(created)
            })
          })
        } else {
          if (noconformidad.FechaRevision != null && noconformidad.AreaId != null && noconformidad.gravedad != null){
            noconformidad.update({
              FechaCierre: moment(),
              status: "cerrado"
            }).then(function(){
            return models.NoConformidad.findByPk(noconformidad.id)
            })
          }
        }
      }    
    })
    .then(function (data) {
      //jsonAPIBody.data = data.toJSON();
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'quejasreclamaciones/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'quejasreclamaciones/update',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};

