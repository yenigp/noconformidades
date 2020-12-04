'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  jsonAPIBody.data = req.acciones;
  console.log(req.acciones)
  return res.status(200).json(jsonAPIBody); // OK.
};
