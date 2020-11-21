'use strict';

var moment = require('moment');
const noconformidad = require('.');
const tiponc = require('../tiponc');

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var Sequelize = global.app.orm.Sequelize;

	var jsonAPI = global.app.utils.jsonAPI;
  var jsonAPIBody = {
    data: {}
  };

  //Función que valida que exista un producto y devuelve su id
  async function ValidarProducto(ProductoId) {
    return await models.Producto.findOne({ 
      where: { id: ProductoId}
    }).then(function(productoX){
      if (! productoX) {
        return res.status(404).json({
          errors:[
            {
              field: "producto",
              title: "El producto no existe"
            }
          ]
        })
    } else{
        return productoX.id;
      }
    })
  }

  //Función que valida que exista un servicio y devuelve el id del producto asociado.
  async function ValidarServicio(ServicioId) {
    return await models.ProdServicio.findOne({ 
      where: { id: ServicioId}
    }).then(function(servicioX){
      if (! servicioX) {
        return res.status(404).json({
          errors:[
            {
              field: "servicio",
              title: "El servicio no existe"
            }
          ]
        })
      } else{   
        return servicioX.idproducto;
      }
    })
  }

  //Función que valida que exista una reserva y devuelve su id.
  async function ValidarReserva(ReservaId) {
    return await models.ReservaPadre.findOne({ 
      where: { id: ReservaId}
    }).then(function(reservaX){
      if (! reservaX) {
        return res.status(404).json({
          errors:[
            {
              field: "reserva",
              title: "La reserva no existe"
            }
          ]
        })
      } else{    
        return reservaX.id;
      }
    })
  }

  //Función que valida que exista un Turista y devuelve el id de la reserva asociada.
  async function ValidarTurista(TuristaId) {
    return await models.Turista.findOne({ 
      where: { id: TuristaId}
    }).then(function(turistaX){
      if (! turistaX) {
        return res.status(404).json({
          errors:[
            {
              field: "turista",
              title: "El turista no existe"
            }
          ]
        })
      } else{ 
        return turistaX.idreservapadre;
      }
    })
  }

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
      //Creando una no conformidad
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
          resultado: req.body.resultado,
          estado: req.body.estado,
          FechaRevision: req.body.FechaRevision,
          FechaCierre: req.body.FechaCierre,
          AreaId: req.body.AreaId,
          gravedad: req.body.gravedad,
          CreatorId: req.body.CreatorId
        },{
          transaction: t
        })
        .then(async function (noconformidad) {
          var id=noconformidad.id;
          var codigo=await GenerarCodigo(id,10);
          var tiponc = await BuscarCodigoPorTipoId(req.body.TipoId);
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
          }
        /*Si el tipo de no conformidad enviado por el usuario su código es 
        quejas y reclamaciones entonces se crea una Queja y Reclamación.*/
        else if (tiponc === 'QR'){
          var producto = await ValidarProducto(req.body.ProductoId);
          var servicio = await ValidarServicio(req.body.ServicioId);
          var reserva = await ValidarReserva(req.body.ReservaId);
          var turista = await ValidarTurista(req.body.TuristaId);
          if (producto !== servicio){
            return res.status(404).json({
              errors:[
                {
                  field: "producto-servicio",
                  title: "El servicio registrado no pertenece a ese producto"
                }
              ]
            })
          }else if (reserva !== turista){
            return res.status(404).json({
              errors:[
                {
                  field: "reserva-turista",
                  title: "El turista registrado no está asociado a ese número de reserva"
                }
              ]
            })
          }else {
            return models
            .QuejasReclamaciones
            .create({
              NoConformidadId: noconformidad.id,
              ServicioId: req.body.ServicioId,
              ProductoId: req.body.ProductoId,
              TuristaId: req.body.TuristaId,
              ReservaId: req.body.ReservaId,
              clasificacion: req.body.clasificacion,
              CostoNoCalidad: req.body.CostoNoCalidad,
              observacion: req.body.observacion,
              CreatorId: noconformidad.CreatorId
            })
          }      
        }
        /*Si el tipo de no conformidad enviado por el usuario su código es 
        incidencias entonces se crea una Incidencia.*/
        else if (tiponc === 'RI'){
          return models
          .Incidencia
          .create({
            NoConformidadId: noconformidad.id,
            tipo: req.body.tipo,
            CausaInvestigacion: req.body.CausaInvestigacion,
            CreatorId: noconformidad.CreatorId
          })
        } else{
          return noconformidad.update({
            codigo: codigo,
          }, { transaction: t }).then(function(){
          return models.NoConformidad.findByPk(noconformidad.id, { transaction: t })
          })
        }       
      })
      .then(async function(incidencia){
        var causainvestigacion = incidencia.CausaInvestigacion;
        if (causainvestigacion === false){
          return res.status(404).json({
            errors:[
              {
                field: "incidencia",
                title: "La incidencia no será investigada por lo que no hay que crear un expediente"
              }
            ]
          })
        } else{
          console.log(noconformidad)
          return models
          .Expediente
          .create({
            NoConformidadId: noconformidad.id,
            evidencia: req.body.evidencia,
            estado: req.body.estado,
            CreatorId: noconformidad.CreatorId
         });
        }
      })
      .then(async function (noconformidad) {
        return Sequelize.Promise.mapSeries(noconformidad, models.Acciones.create())
          .then(([noconformidad, acciones]) => {
            return models.NCAcciones.create({ NoConformidadId: noconformidad.id, AccionesId: acciones.id },{
              transaction:t
            })
          })
      })
    })
    .then(function (data) {
      jsonAPIBody.data = data.toJSON();
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