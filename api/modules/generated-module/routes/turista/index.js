'use strict';

var lodash  = require('lodash');
const { Op } = require("sequelize");
var moment = require('moment');

module.exports = function (req, res) {
  var models = global.app.orm.sequelize.models;
  var jsonAPI = global.app.utils.jsonAPI;

  var jsonAPIBody = {
    meta: {
      pagination: {}
    },
    data: []
  };

  var query = jsonAPI.buildQueryFromReq({
    req  : req,
    model: models.Turista,
    attributes: ["nombre"]
  });

  query.include=[
    {
      model: models.ReservaPadre,
      attributes:["localizador"]
    },
    {
      model: models.Pais,
      attributes:["descripcion"]
    },
    {
      model: models.TuristaReserva,
      include: [
        {
          model: models.Reserva,
          attributes: ["locreservapadre","idtipoproducto", "nombservicio"],
          where: {
            fcreacion: {[Op.gte]: moment().subtract(1,'y').format('YYYY-MM-DD')}
          }
        }
      ]
    }
  ]

  query=jsonAPI.prepareQuery(query);
  return models
    .Turista.findAll(query)
    .then(function (data) {
      jsonAPIBody.data                  = data;
      jsonAPIBody.meta.pagination.count = data.length;
      global.app.utils.jsonAPI.cleanQuery(query);
      return models.Turista.count(query);
    })
    .then(function (total) {
      jsonAPIBody.meta.pagination.total = total;
      return res.status(200).json(jsonAPIBody); // OK.
    })
    .catch(global.app.orm.Sequelize.ValidationError, function (error) {
      global.app.utils.logger.error(error, {
        module   : 'turista/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(400)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    })
    .catch(function (error) {
      global.app.utils.logger.error(error, {
        module   : 'turista/index',
        submodule: 'routes',
        stack    : error.stack
      });
      return res.status(500)
         .json(jsonAPI.processErrors(error, req, {file:__filename}));
    });
};
