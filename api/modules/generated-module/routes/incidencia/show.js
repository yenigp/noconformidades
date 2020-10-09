'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  jsonAPIBody.data = req.incidencia;
  return res.status(200).json(jsonAPIBody); // OK.
};
