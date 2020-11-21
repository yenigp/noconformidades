module.exports={
    createRoles: createRoles
}
  
  async function createRoles () {
      try {
          var models = global.app.orm.sequelize.models;
          const count = await models.Roles.estimatedDocumentCount();

          if (count > 0) return;

          const values = await Promise.all([
              new Roles({ name: 'Usuario', descripcion: 'Rol por defecto para todos los usuarios que no se le asigna un rol'}).save(),
              new Roles({ nombre: 'Auditor',
              descripcion: 'Rol con permisos registrar las no conformidades de tipo auditoría'}).save(),
              new Roles({ nombre: 'JefeProceso',
              descripcion: 'Rol con permisos para actualizar las no conformidades'}).save(),
              new Roles({ nombre: 'SuperAdmin',
              descripcion: 'Rol de Administración del Sistema'}).save(),
              new Roles({ nombre: 'AdminSucursal',
              descripcion: 'Rol con permisos para administrar los usuarios de una Sucursal'}).save(),
              new Roles({ nombre: 'AdminEmpresa',
              descripcion: 'Rol con permisos para administrar el sistema a nivel de Casa Matriz'}).save(),
              new Roles({ nombre: 'EspCalidadSucursal',
              descripcion: 'Rol con permisos para registrar las quejas y reclamaciones de una Sucursal'}).save(),
              new Roles({ nombre: 'EspCalidadEmpresa',
              descripcion: 'Rol con permisos para visualizar el comportamiento de las no conformidades'}).save(),
              new Roles({ nombre: 'Supervisor',
              descripcion: 'Rol con permisos para registrar las no conformidades de tipo incidencia'}).save(),
              new Roles({ nombre: 'DirectorSucursal',
              descripcion: 'Rol con permisos para actualizar no conformidades'}).save(),
          ]);
          
          console.log (values);
      } catch (error) {
          console.error(error);
      }
  }