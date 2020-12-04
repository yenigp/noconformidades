'use strict';

exports.loadModels = function loadModels() {
    require('./models/accion_tarea.js').loadModel();
    require('./models/acciones.js').loadModel();
    require('./models/agenciamercado.js').loadModel();
    require('./models/agenciaviajes.js').loadModel();
    require('./models/auditoria.js').loadModel();
    require('./models/dictamen.js').loadModel();
    require('./models/expediente.js').loadModel();
    require('./models/incidencia.js').loadModel();
    require('./models/indicadores_objetivos.js').loadModel();
    require('./models/indicadores.js').loadModel();
    require('./models/mercado.js').loadModel();
    require('./models/mercadopais.js').loadModel();
    require('./models/ncacciones.js').loadModel();
    require('./models/usuario.js').loadModel();
    require('./models/noconformidad.js').loadModel();
    require('./models/norma.js').loadModel();
    require('./models/objetivo_calidad.js').loadModel();
    require('./models/pais.js').loadModel();
    require('./models/proceso.js').loadModel();
    require('./models/prodservicio.js').loadModel();
    require('./models/producto.js').loadModel();
    require('./models/quejas_reclamaciones.js').loadModel();
    require('./models/reserva.js').loadModel();
    require('./models/reservapadre.js').loadModel();
    require('./models/area.js').loadModel();
    require('./models/sucursal.js').loadModel();
    require('./models/tareas.js').loadModel();
    require('./models/turista.js').loadModel();
    require('./models/turistareserva.js').loadModel();
    require('./models/tiponc').loadModel();
    require('./models/tipoac').loadModel();
    require('./models/encuentas').loadModel();
    require('./models/preguntas').loadModel();
    require('./models/categorias').loadModel();
    require('./models/respuestas').loadModel();
    require('./models/roles').loadModel()

};

exports.loadTasks = function loadTasks() {

};

exports.setRoutes = function setRoutes() {
    require('./routes/acciones/registry').registry();
    require('./routes/agenciaviajes/registry').registry();
    require('./routes/auditoria/registry').registry();
    require('./routes/dictamen/registry').registry();
    require('./routes/expediente/registry').registry();
    require('./routes/incidencia/registry').registry();
    require('./routes/indicadores/registry').registry();
    require('./routes/mercado/registry').registry();
    require('./routes/usuario/registry').registry();
    require('./routes/roles/registry').registry();
    require('./routes/noconformidad/registry').registry();
    require('./routes/norma/registry').registry();
    require('./routes/objetivoscalidad/registry').registry();
    require('./routes/pais/registry').registry();
    require('./routes/proceso/registry').registry();
    require('./routes/prodservicio/registry').registry();
    require('./routes/producto/registry').registry();
    require('./routes/quejasreclamaciones/registry').registry();
    require('./routes/reserva/registry').registry();
    require('./routes/area/registry').registry();
    require('./routes/sucursal/registry').registry();
    require('./routes/tareas/registry').registry();
    require('./routes/turista/registry').registry();
    require('./routes/tiponc/registry').registry();
    require('./routes/tipoac/registry').registry();
    require('./routes/encuestas/registry').registry();
    require('./routes/categorias/registry').registry();
    require('./routes/preguntas/registry').registry();
    require('./routes/respuestas/registry').registry();
};
