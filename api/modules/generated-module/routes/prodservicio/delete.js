'use strict';

module.exports = function (req, res) {
	var jsonAPI = global.app.utils.jsonAPI;

  return req
    .prodservicio
    .destroy()
    .then(function () {
      return res.sendStatus(204); // No Content.
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'prodservicio/create',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};
