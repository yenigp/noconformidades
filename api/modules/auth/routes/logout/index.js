'use strict';
module.exports = function (req, res) {
  /**
   dato el token,
   actualizar lastLogin del user en now()

   * */
  ;
  return req.loggedUser.update({
    lastLogout: new Date().toISOString().split("T").join(" ").split("Z").join(""),
  }).then(function () {
    return res.sendStatus(204);
  }).catch(global.app.orm.Sequelize.ValidationError, function (error) {
    global.app.utils.logger.error(error, {
      module   : 'auth/logout',
      submodule: 'routes',
      stack    : error.stack
    });
    return res.sendStatus(204);
  }).catch(function (error) {
    global.app.utils.logger.error(error, {
      module   : 'auth/logout',
      submodule: 'routes',
      stack    : error.stack
    });
    return res.sendStatus(204);
  });
};
