'use strict';

exports.loadModels = function loadModels() {
    require('./models/accion_correctiva.js').loadModel();
    require('./models/accion_mejora.js').loadModel();
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
    require('./models/modalidad_turistica.js').loadModel();
    require('./models/nc_usuario.js').loadModel();
    require('./models/no_conformidad.js').loadModel();
    require('./models/norma.js').loadModel();
    require('./models/objetivo_calidad.js').loadModel();
    require('./models/pais.js').loadModel();
    require('./models/proceso.js').loadModel();
    require('./models/prodservicio.js').loadModel();
    require('./models/producto.js').loadModel();
    require('./models/quejas_reclamacione.js').loadModel();
    require('./models/reserva.js').loadModel();
    require('./models/reservapadre.js').loadModel();
    require('./models/sc_area.js').loadModel();
    require('./models/sc_cargo.js').loadModel();
    require('./models/sc_log.js').loadModel();
    require('./models/sc_rol.js').loadModel();
    require('./models/sucursal.js').loadModel();
    require('./models/tareas.js').loadModel();
    require('./models/turista.js').loadModel();
    require('./models/turistareserva.js').loadModel();

};

exports.loadTasks = function loadTasks() {

};

exports.setRoutes = function setRoutes() {
    require('./routes/accion_correctiva/registry').registry();
    require('./routes/accion_mejora/registry').registry();
    require('./routes/accion_tarea/registry').registry();
    require('./routes/acciones/registry').registry();
    require('./routes/agenciamercado/registry').registry();
    require('./routes/agenciaviajes/registry').registry();
    require('./routes/auditoria/registry').registry();
    require('./routes/dictamen/registry').registry();
    require('./routes/expediente/registry').registry();
    require('./routes/incidencia/registry').registry();
    require('./routes/indicadores_objetivos/registry').registry();
    require('./routes/indicadores/registry').registry();
    require('./routes/mercado/registry').registry();
    require('./routes/mercadopais/registry').registry();
    require('./routes/modalidad_turistica/registry').registry();
    require('./routes/nc_usuario/registry').registry();
    require('./routes/no_conformidad/registry').registry();
    require('./routes/norma/registry').registry();
    require('./routes/objetivo_calidad/registry').registry();
    require('./routes/pais/registry').registry();
    require('./routes/proceso/registry').registry();
    require('./routes/prodservicio/registry').registry();
    require('./routes/producto/registry').registry();
    require('./routes/quejas_reclamacione/registry').registry();
    require('./routes/reserva/registry').registry();
    require('./routes/reservapadre/registry').registry();
    require('./routes/sc_area/registry').registry();
    require('./routes/sc_cargo/registry').registry();
    require('./routes/sc_log/registry').registry();
    require('./routes/sc_rol/registry').registry();
    require('./routes/sucursal/registry').registry();
    require('./routes/tareas/registry').registry();
    require('./routes/turista/registry').registry();
    require('./routes/turistareserva/registry').registry();
};
