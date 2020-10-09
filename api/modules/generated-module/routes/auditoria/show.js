'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  jsonAPIBody.data = req.auditoria;
  return res.status(200).json(jsonAPIBody); // OK.
};
