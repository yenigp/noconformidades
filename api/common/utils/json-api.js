'use strict';

var lodash    = require('lodash');
var lang      = require('../i18n/index.js');
var fs        = require('fs');

var jsonAPIKeywords = [
  'limit',
  'offset',
  'order',
  'filter',
  'fields'
];

/**
 * Reemplaza los filtros que empiecen con simbolo de $
 * por su respectivo semejante en el operatorAliasses 
 * de sequelize
 * @param {Object} filter 
 * @param {Object} operators 
 */
function changeFilterOperatorAliases(filter, operators){
  if (filter==undefined || typeof filter!='object'){
    return;
  }
  var keys=Object.keys(filter);
  var newKey="";
  for (var i=0;i<keys.length;i++){
    if (filter[keys[i]]==undefined){
      filter[keys[i]]=null;
    }
    if (keys[i][0]=="$"&&keys[i].indexOf(".")==-1){
      newKey=keys[i].substr(1,keys[i].length)
      filter[operators[newKey]]=lodash.cloneDeep(filter[keys[i]]);
      delete filter[keys[i]];
      changeFilterOperatorAliases(filter[operators[newKey]],operators)      
    }else if (["transaction"].indexOf(keys[i])==-1) {
      changeFilterOperatorAliases(filter[keys[i]],operators)     
    }
  }
}

/**
 * Funcion para ser llamada antes de ejecutar cualquier query,
 * esta es la que preparara la peticion con los
 * operator aliases del sequelize
 * @param {Object} query 
 */
function prepareQuery(query){
  changeFilterOperatorAliases(query,global.app.orm.Sequelize.Op);
  // console.log(util.inspect(query,{depth:null}))
  return query;
}
/**
 * Build a query object suitable for db queries from a JSON API request.
 *
 * @param {Object}  options                 - The options that will be used to build the
 *                                            database query.
 * @param {Object}  options.req             - The request object needed to gather
 *                                            the query params.
 * @param {Object}  options.model           - The Sequelize model needed to check the
 *                                            model attributes.
 * @param {Object}  options.modelMapWhere   - A model map name for sub includes
 *                                            { key : '$Table.SubTable.' }
 *                                            Ex: {'locality'  : '$PostalAddress.CountryDataLocality.'} *
 *
 * @returns {Object}
 */
function buildQueryFromReq(options) {
  var query = {};
  // Limit.
  // Query example: `?limit=100`.
  var UNLIMITED_DATA = 0;
  if ('limit' in options.req.query) {
    // If limit is zero then treat it as unlimited.
    if (parseInt(options.req.query.limit, 10) !== UNLIMITED_DATA) {
      query.limit = parseInt(options.req.query.limit);
    }
  }
  else {
    query.limit = global.app.config.get('api:pagination:limit');
  }

  // Offset.
  // Query example: `?offset=5`.
  var NO_OFFSET = 0;
  if ('offset' in options.req.query) {
    query.offset = parseInt(options.req.query.offset);
  }
  else {
    query.offset = NO_OFFSET;
  }

  // Sorting.
  // Query example: `?order=-created,title`.
  //  query.order= [ [ {model:models.User, as:'Recharger'},'name', 'desc' ] ],
  if ('order' in options.req.query) {
    query.order = lodash.map(options.req.query.order.split(','), function (item) {
      var processed = {};

      switch (item[0]) {
        case '+':
          processed.field = item.substring(1);
          processed.order = 'ASC';
          break;

        case '-':
          processed.field = item.substring(1);
          processed.order = 'DESC';
          break;

        default:
          processed.field = item;
          processed.order = 'ASC';
          break;
      }

      console.log('=====================');
      var spl = "";
      if (item[0] == '-' || item[0] == '+') {
        item = item.substring(1);

      }
      spl = item.split('.');
      console.log(spl);
      if (options.orderModel && options.orderModel[spl[0]]) {
        console.log(options.orderModel[spl[0]]);

        var r = [];
        for (var i = 0; i < spl.length - 1; i++) {
          r.push(
            options.orderModel[spl[i]]
          );
        }
        r.push(spl[spl.length - 1]);
        r.push(processed.order);
        console.log('----------------------------------------78');
        console.log(r);
        return r;
      }
      else {
        return [
          processed.field,
          processed.order
        ];
      }
    });
  }

  // Replace modelMapWhere in query
  // Ex: filter[$or][locality][name][$like]=%bana%
  // After replace: filter[$or][$PostalAddress.CountryDataLocality.name$][$like]=%bana%
  // modelMapWhere ex: {paramName:'$tableAs.$subTableAs.'}
  // if the model use option as, this must be paste in modelMapWhere
  // else use default modelName
  /*
   * base=options.req.query.filter
   * */
  function processOr(base, key) {
    if (lodash.has(base, '$or')) {

      if (lodash.has(base.$or, key)) {
        var temp = base.$or[key];
        lodash.forEach(temp, function (value2, key2) {
          base.$or[options.modelMapWhere[key] + key2 + '$'] = value2;
        });
        base.$or = lodash.omit(base.$or, key);
      }
      if (lodash.has(base.$or, '$or')) {
        processOr(base.$or, key);
      }
      if (lodash.has(base.$or, '$and')) {
        processAnd(base.$or, key);
      }
    }
  }

  function processAnd(base, key) {
    if (lodash.has(base, '$and')) {
      if (lodash.has(base.$and, key)) {
        var temp = base.$and[key];
        lodash.forEach(temp, function (value2, key2) {
          base.$and[options.modelMapWhere[key] + key2 + '$'] = value2;
        });
        base.$and = lodash.omit(base.$and, key);
        console.log(base);
      }
      if (lodash.has(base.$and, '$or')) {
        processOr(base.$and, key);
      }
      if (lodash.has(base.$and, '$and')) {
        processAnd(base.$and, key);
      }
    }
  }

  if (options.modelMapWhere && options.req.query.filter) {
    lodash.forEach(options.modelMapWhere, function (value, key) {
      processAnd(options.req.query.filter, key);
      processOr(options.req.query.filter, key);

    });
  }

  // Filtering.
  // Query example: `?filter[fieldName]=fieldPartialValue`.
  // Query example: `?filter[fieldName]=value1&filter[fieldName]=value2`.
  // For more information check out http://sequelize.readthedocs.org/en/latest/docs/querying.
  query.where = {};
  if ('filter' in options.req.query) {
    query.where = options.req.query.filter;
  }

  return query;
}

function devNotification(data) {
  console.log(data);
  if (data.noMail) {
    return 0;
  }
  //return 0;
  if (!global.app.config.get("developers:sendNotifications")) {
    // inactive dev notification
    return;
  }
  if (typeof data != 'object' || data.subject == undefined) {
    data = {
      subject: 'Dev Notification',
      text   : data
    }
  }
  if (typeof  data.text == 'object') {
    data.text = JSON.stringify(data);
  }
  var mailerConfig = global.app.config.get('mailer');
  if (mailerConfig == undefined ||
      global.app.utils.mailer == undefined ||
      typeof global.app.utils.mailer.sendMail !== 'function') {
    return;
  }

  var mail = {
    from   : mailerConfig.from,
    bcc    : global.app.config.get("developers:mails"),
    subject: data.subject,
    text   : data.text,
    html   : data.text
  };
  global.app.utils.mailer.sendMail(mail,
    function (err, info) {
      if (err) {
        global.app.utils.logger.error('Dev mailer', err.message);
      }
      else {
        global.app.utils.logger.info('Dev mailer', info.response);
        global.app.utils.mailer.close();
      }
    }
  );
}

/**
 * Catch all errors.
 *
 * @param {Object}    error     - A Sequelize error that will be used as sourec
 *                                to form a valid JSON API error response.
 *
 * @param {Object}   req       - request info
 * @param {Object}   extra       - extra info
 * @returns {Object}
 */
function processErrors(error, req, extra) {
  console.log('Entrando a la gestion de los errores');
  var language = 'en';
  if (req == undefined) {
    req = {};
  }
  else {
    language = req.header('language');
  }
  console.log('en el header viene', language);
  language = language || 'en';
  console.log(language);
  // TODO: Refactor this function to be simpler.
  var jsonAPIErrors     = {
    errors: []
  };
  var errorsToTranslate = [];

  if (error.errors && error.errors.length) {
    lodash.forEach(error.errors, function (item) {
      var newError = {};
      if (error.name || error.code) {
        newError.code = error.name || error.code;
      }
      if (item.message || item.title) {
        newError.title = item.message || item.title;
      }
      if (item.path || item.field) {
        newError.field = item.path || item.field;
      }
      if (item.status) {
        newError.status = item.status;
      }
      errorsToTranslate.push(newError);
    });
  }
  else {
    var newError = {};
    if (error.name) {
      newError.code = error.name;
    }
    if (error.message || error.title) {
      newError.title = error.message || error.title;
    }
    if (error.path || error.field) {
      newError.field = error.path || error.field;
    }
    if (error.status) {
      newError.status = error.status;
    }
    errorsToTranslate.push(newError);
  }
  if (!language) {
    language = 'en';
  }

  if (!language || !lang[language]) {
    devNotification({language1: language});
    jsonAPIErrors.errors = errorsToTranslate;
  }
  else {
    errorsToTranslate.forEach(function (err) {
        var tempLanguage = lang[language];
        if (tempLanguage["fields"][err.field]) {
          err.field = tempLanguage["fields"][err.field];
        }
        else {
          devNotification({user: req.user, extra: extra, language2: language, field: err.field, err: error.stack});
        }
        if (tempLanguage['messages'][err.title]) {
          err.title = tempLanguage["messages"][err.title];
        }
        else {
          devNotification({user: req.user, extra: extra, language3: language, title: err.title, err: error.stack});
        }
        jsonAPIErrors.errors.push(err);
      }
    );
  }

  return jsonAPIErrors;
}

module.exports = {
  keywords                    : jsonAPIKeywords,
  buildQueryFromReq           : buildQueryFromReq,
  buildQueryFromReqForMongoose: buildQueryFromReqForMongoose,
  processErrors               : processErrors,
  devNotification             : devNotification,
  search                      : search,
  cleanQuery                  : cleanQuery,
  changeFilterOperatorAliases : changeFilterOperatorAliases,
  prepareQuery: prepareQuery
};

/**
 * para buscar en un arreglo de objetos
 * de base de datos
 * */
function search(arr, key, value, extras) {
  var result = undefined;
  for (var i = 0; i < arr.length && result == undefined; i++) {
    if (arr[i].dataValues[key] == value) {
      result = arr[i];
    }
  }
  if (result == undefined) {
    for (var i = 0; i < arr.length && result == undefined; i++) {
      if (extras.indexOf(arr[i].dataValues[key]) != -1) {
        result = arr[i];
      }
    }
  }
  return result;
}

/**
 * for count total
 * */
function cleanQuery(query) {
  delete query.offset;
  delete query.limit;
  return query;
}

/**
 * Export html info into a pdf file
 *
 * @param {Object} options             - The options that will be used to render
 *                                       the pdf file
 * @param {String} options.templateName    - The html template name
 *
 * @param {String} options.filename    - The filename for the pdf file
 *
 * @param {String} options.pdfOptions     - The options for the html-pdf module
 *
 * @param {object} options.context     - The context info needed to render the
 *                                       html template
 * @param {function} options.callBack  - The function to execute after pdf render
 *
 * @param {object}   options.i18nMerge      - The i18n translation
 *
 * */
//function renderPdf(options) {
//  swig_i18n.init(options.i18nMerge);
//  return global.app
//    .emailTemplates[options.templateName]
//    .render(options.context)
//    .then(function (renderedTemplate) {
//      return pdf.create(renderedTemplate.html, options.pdfOptions)
//                .toFile(options.filename, function (err, buffer) {
//                  console.log(err);
//                  console.log('This is the route:', buffer);
//                  return options.callback();
//                });
//    })
//}

/**
 * Build a query object suitable for db queries from a JSON API request.
 *
 * @param {Object}  options             - The options that will be used to build the
 *                                        database query.
 * @param {Object}  options.req         - The request object needed to gather
 *                                        the query params.
 * @param {Object}  options.model       - The Mongoose model needed to check the
 *                                        model attributes.
 *
 * @returns {Object}
 */
function buildQueryFromReqForMongoose(options) {
  var query = {};

  // Limit.
  // Query example: `?limit=100`.
  var UNLIMITED_DATA = 0;
  if ('limit' in options.req.query) {
    // If limit is zero then treat it as unlimited.
    if (parseInt(options.req.query.limit, 10) !== UNLIMITED_DATA) {
      query.limit = parseInt(options.req.query.limit);
    }
  }
  else {
    query.limit = global.app.config.get('api:pagination:limit');
  }

  // Offset.
  // Query example: `?offset=5`.
  var NO_OFFSET = 0;
  if ('offset' in options.req.query) {
    query.offset = parseInt(options.req.query.offset);
  }
  else {
    query.offset = NO_OFFSET;
  }

  // Sorting.
  // Query example: `?order=-created,title`.
  if ('order' in options.req.query) {
    query.order = options.req.query.order.replace(',', ' ');
  }

  // Filtering.
  // Query example: `?filter[fieldName]=fieldPartialValue`.
  // Query example: `?filter[fieldName]=value1&filter[fieldName]=value2`.
  // For more information check out http://sequelize.readthedocs.org/en/latest/docs/querying.
  query.where = {};
  if ('filter' in options.req.query) {
    var newData = {
      root: options.req.query.filter
    };

    var rootedFilter = {
      root: options.req.query.filter
    };

    recurseOverFilterMongoose('root', rootedFilter, newData, options.model.schema.paths);
    query.where = newData.root;
  }

  // TODO: Include models.
  // TODO: Sparse fields.
  return query;
}

function recurseOverFilterMongoose(path, oldData, newData, schema) {
  var portion = lodash.get(oldData, path);

  if (lodash.isPlainObject(portion)) {
    var keys = Object.keys(portion);
    if (!keys.length) {
      return;
    }

    return lodash.forEach(keys, function (item) {
      var newPath = path + '.' + item;
      recurseOverFilterMongoose(newPath, oldData, newData, schema);
    });
  }
  else if (lodash.isArray(portion)) {
    return lodash.forEach(portion, function (item, key) {
      var newPath = path + '[' + key + ']';
      recurseOverFilterMongoose(newPath, oldData, newData, schema);
    });
  }
  else {
    var pathStrippedFromRoot = path.replace('root.', '');
    var schemaKeys           = Object.keys(schema);

    lodash.forEach(schemaKeys, function (item) {
      if (pathStrippedFromRoot.search(item) !== -1) {
        var type  = schema[item].instance;
        var value = lodash.get(oldData, path);

        switch (type.toLowerCase()) {
          case 'string':
            lodash.set(newData, path, new RegExp(value));
            break;
          case 'number':
            lodash.set(newData, path, Number(value));
            break;
          case 'date':
            lodash.set(newData, path, new Date(value));
            break;
          case 'boolean':
            lodash.set(newData, path, Boolean(value));
            break;
          case 'objectid':
          case 'buffer':
            // Noop. Leave it as a String.
            break;
        }
      }
    });
  }
}
