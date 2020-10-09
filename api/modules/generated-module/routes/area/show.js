'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  jsonAPIBody.data = req.area;
  return res.status(200).json(jsonAPIBody); // OK.
};
