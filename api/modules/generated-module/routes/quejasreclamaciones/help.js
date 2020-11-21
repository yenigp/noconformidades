'use strict';
module.exports = function (req, res) {
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    req.query = {
      getById: true,
      get    : true,
      post   : true,
      patch  : true,
      delete : true
    }
  }
  var data    = `
    params:
      get=1
      post=1
      patch=1
      delete=1
      show=1
      
      
  `;
  var getHelp = `
    //------------------------------------------------------------------------------------------
    get: /v1/quejasreclamaciones
    headers:
          Authorization: Bearer tokenxyz
    query params:
      {
        ?limit=10
        ?offset=0
        ?order=-createdAt,id
        ?filter[id][$gte]=4
        // For more information check out http://sequelize.readthedocs.org/en/latest/docs/querying.
      }
    return:
      status 200:
        {
          links:{
            client: "http://localhost:4000/v1/client/:id"
          },
          meta:{
            pagination:{
              count: 10,
              total: 57
            }
          },
          data:[
            {
              id: 1 u
              
              ProcesoId: Proceso +
              NormaId: Norma +
              codigo: QRGC200001
              status: "pendiente|abierta|analizando|cerrrada"
              FechaRegistro: 2018-09-05 20:28:13
              FechaIdentificacion: 2018-09-05 20:28:13
              FechaTermino: 2018-09-05 20:28:13
              TipoId: Tipo +
              descripcion: "Prueba de registro de no conformidades"
              evidencia: public/04cdc7be-84fb-4e01-b307-929fd9dee44f.png
              EspCalidad: Usuario
              JefeProceso: Usuario
              CreatorId: Usuario
              NoConformidadId: NoConformidad
              ServicioId: Servicio +
              ProductoId: Producto
              TuristaId: Turista
              ReservaId: Reserva
              clasificacion: "interna|externa"
              observacion: "Prueba de registro de no conformidades...."
              createdAt: 2018-09-05 20:28:13
              updatedAt: 2018-09-05 20:28:13
            }
          ]
        }
  `;

  var postHelp = `
  //------------------------------------------------------------------------------------------
  post: /v1/quejasreclamaciones
    headers:
        Content-Type: application/json
        Authorization: Bearer tokenxyz
    body params:
      {
        
        ProcesoId: Proceso +
        NormaId: Norma +
        codigo: QRGC200001
        status: "pendiente|abierta|analizando|cerrrada"
        FechaRegistro: 2018-09-05 20:28:13
        FechaIdentificacion: 2018-09-05 20:28:13
        FechaTermino: 2018-09-05 20:28:13
        TipoId: Tipo +
        descripcion: "Prueba de registro de no conformidades"
        evidencia: public/04cdc7be-84fb-4e01-b307-929fd9dee44f.png
        EspCalidad: Usuario
        JefeProceso: Usuario
        CreatorId: Usuario
        NoConformidadId: NoConformidad
        ServicioId: Servicio +
        ProductoId: Producto
        TuristaId: Turista
        ReservaId: Reserva
        clasificacion: "interna|externa"
        observacion: "Prueba de registro de no conformidades...."
      }
    return:
      status 201:
        {
          data:[
            {
              id: 2 u
              
              ProcesoId: Proceso +
              NormaId: Norma +
              codigo: QRGC200001
              status: "pendiente|abierta|analizando|cerrrada"
              FechaRegistro: 2018-09-05 20:28:13
              FechaIdentificacion: 2018-09-05 20:28:13
              FechaTermino: 2018-09-05 20:28:13
              TipoId: Tipo +
              descripcion: "Prueba de registro de no conformidades"
              evidencia: public/04cdc7be-84fb-4e01-b307-929fd9dee44f.png
              EspCalidad: Usuario
              JefeProceso: Usuario
              CreatorId: Usuario
              NoConformidadId: NoConformidad
              ServicioId: Servicio +
              ProductoId: Producto
              TuristaId: Turista
              ReservaId: Reserva
              clasificacion: "interna|externa"
              observacion: "Prueba de registro de no conformidades...."
              createdAt: 2018-09-05 20:28:13
              updatedAt: 2018-09-05 20:28:13
            }
          ]
        }
  `;

  var patchHelp = `
  //------------------------------------------------------------------------------------------
  patch: /v1/quejasreclamaciones
    headers:
          Content-Type: application/json
          Authorization: Bearer tokenxyz
    body params:
      {

        ProcesoId: Proceso +
        NormaId: Norma +
        codigo: QRGC200001
        status: "pendiente|abierta|analizando|cerrrada"
        FechaRegistro: 2018-09-05 20:28:13
        FechaIdentificacion: 2018-09-05 20:28:13
        FechaTermino: 2018-09-05 20:28:13
        TipoId: Tipo +
        descripcion: "Prueba de registro de no conformidades"
        evidencia: public/04cdc7be-84fb-4e01-b307-929fd9dee44f.png
        EspCalidad: Usuario
        JefeProceso: Usuario
        CreatorId: Usuario
        NoConformidadId: NoConformidad
        ServicioId: Servicio +
        ProductoId: Producto
        TuristaId: Turista
        ReservaId: Reserva
        clasificacion: "interna|externa"
        observacion: "Prueba de registro de no conformidades...."
      }
    return:
      status 200:
        {
          data:[
            {
              id: 2 u
              
              ProcesoId: Proceso +
              NormaId: Norma +
              codigo: QRGC200001
              status: "pendiente|abierta|analizando|cerrrada"
              FechaRegistro: 2018-09-05 20:28:13
              FechaIdentificacion: 2018-09-05 20:28:13
              FechaTermino: 2018-09-05 20:28:13
              TipoId: Tipo +
              descripcion: "Prueba de registro de no conformidades"
              evidencia: public/04cdc7be-84fb-4e01-b307-929fd9dee44f.png
              EspCalidad: Usuario
              JefeProceso: Usuario
              CreatorId: Usuario
              NoConformidadId: NoConformidad
              ServicioId: Servicio +
              ProductoId: Producto
              TuristaId: Turista
              ReservaId: Reserva
              clasificacion: "interna|externa"
              observacion: "Prueba de registro de no conformidades...."
              createdAt: 2018-09-05 20:28:13
              updatedAt: 2018-09-05 20:28:13
            }
          ]
        }
  `;

  var deleteHelp = `
  //------------------------------------------------------------------------------------------
    delete: /v1/quejasreclamaciones/:id
    headers:
          Authorization: Bearer tokenxyz

    return:
      status 204 
      // no content
  `;

  var getByIdHelp = `
  //------------------------------------------------------------------------------------------
    get: /v1/quejasreclamaciones/:id
    headers:
          Authorization: Bearer tokenxyz
    return:
      status 200:
        {
          data:[
            {
              id: 2 u
              
              ProcesoId: Proceso +
              NormaId: Norma +
              codigo: QRGC200001
              status: "pendiente|abierta|analizando|cerrrada"
              FechaRegistro: 2018-09-05 20:28:13
              FechaIdentificacion: 2018-09-05 20:28:13
              FechaTermino: 2018-09-05 20:28:13
              TipoId: Tipo +
              descripcion: "Prueba de registro de no conformidades"
              evidencia: public/04cdc7be-84fb-4e01-b307-929fd9dee44f.png
              EspCalidad: Usuario
              JefeProceso: Usuario
              CreatorId: Usuario
              NoConformidadId: NoConformidad
              ServicioId: Servicio +
              ProductoId: Producto
              TuristaId: Turista
              ReservaId: Reserva
              clasificacion: "interna|externa"
              observacion: "Prueba de registro de no conformidades...."
              createdAt: 2018-09-05 20:28:13
              updatedAt: 2018-09-05 20:28:13
            }
          ]
        }
  `;

  if (req.query.get == true || req.query.get == 'true') {
    data += getHelp;
  }
  if (req.query.getById == true || req.query.getById == 'true') {
    data += getByIdHelp;
  }
  if (req.query.post == true || req.query.post == 'true') {
    data += postHelp;
  }

  if (req.query.patch == true || req.query.patch == 'true') {
    data += patchHelp;
  }

  if (req.query.delete == true || req.query.delete == 'true') {
    data += deleteHelp;
  }

  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(data);
  return res.end();
};
