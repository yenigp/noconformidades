'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  jsonAPIBody.data = req.prodservicio;
  return res.status(200).json(jsonAPIBody); // OK.
};
