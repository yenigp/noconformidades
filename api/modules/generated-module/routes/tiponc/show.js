'use strict';

module.exports = function (req, res) {

  var jsonAPIBody = {
    data: {}
  };

  jsonAPIBody.data = req.tiponc;
  return res.status(200).json(jsonAPIBody); // OK.
};
