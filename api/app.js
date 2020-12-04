'use strict';

var express     = require('express');
var path        = require('path');
var fs          = require('fs');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var compression = require('compression');
var moment      = require('moment');

var http        = require('http');
var https       = require('https');
var async       = require('async');


var app = express();

app.use(compression());
app.use(cors({maxAge: 604800000}));

var config = require('./config/env/index');

if ('app' in global) {
  throw new Error('Global namespace already have a variable named `app`.');
}

global.app          = {};
global.app.config   = config;
global.app.express  = app;
global.app.routes   = {};
global.app.utils    = require('./common/utils/index');
global.utils    = require('./common/utils/index');
global.app.logger   = require('./common/utils/index').logger;
global.app.security = require('./common/middleware/auth');
global.security = require('./common/middleware/auth');
global.savedb = require('./common/db/backup');
global.restoredb = require('./common/db/restore');
global.loadrol = require('./common/utils/load-rol');

app.use(global.app.config.get('api:prefix') + '/public', express.static(__dirname + '/public', {
  maxAge: 604800000
}));

app.use(bodyParser.json({limit: global.app.config.get('api:fileLimit')}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit   : global.app.config.get('api:fileLimit')
}));

var helmet = require('helmet');
app.use(helmet());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  req.connection.setTimeout(1000 * 60 * 10);
  return next();
});











function getDurationInMilliseconds(startTime) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(startTime);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}
function getRequestDuration(req) {
  return getDurationInMilliseconds(req.startTime);
}
function saveSystemLog(req, res, wasFinished) {

  var models = global.app.orm.sequelize.models;

  var SystemLog = models.SystemLog;
  if (req.body) {
    delete req.body.image;
    delete req.body.password;
  }
  var durationInMilliseconds = getRequestDuration(req);
  console.log("El delay fue:", durationInMilliseconds)
  var bodyLog = {
    username: req.loggedUser ? req.loggedUser.usuario : undefined,
    cargo: req.loggedUser ? req.loggedUser.RolId : undefined,
    UsuarioId: req.loggedUser ? req.loggedUser.id : undefined,
    sucursal: req.loggedUser ? req.loggedUser.SucursalId : undefined,
    hasUser: req.loggedUser ? true : false,
    path: req.path,
    protocol: req.protocol,
    host: req.headers.host,
    ip: req.ip,
    headers: JSON.stringify(req.headers),
    delay: durationInMilliseconds,
    method: req.method,
    wasFinished: wasFinished,
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
    respuesta: JSON.stringify(res.cookie),
    statusCode: res.statusCode,
  }

  if (req.statusCode == 500) {
    bodyLog.response = req.error;
    console.log(req.error);
  }

  return global
  .app.orm.sequelize.transaction(function (t){
    return models
    .SystemLog
    .create(bodyLog).then(function (elemento) {
      //console.log(elemento);
    }).catch(function (e) {
      console.log("Error-- en logs", e)
    })
  })
}

// Log API requests.
app.use(function (req, res, next) {
   if ((req.method.toLowerCase() === 'post'
     || req.method.toLowerCase() === 'patch'
     || req.method.toLowerCase() === 'put')
      && !req.is('application/json')

     ) {
     return res.sendStatus(415); // Unsupported Media Type.
   }
  req.startTime=process.hrtime();

  res.on('finish', function onResFinish() {
    var user = {}
    if (req.loggedUser) {
      user = {
        id: req.loggedUser.id,
        username: req.loggedUser.usuario,
        sucursal: req.loggedUser.SucursalId,
        email: req.loggedUser.email
      }
    }
     saveSystemLog(req, res, true);
    req.finished = true;

    global.app.utils.logger.info('API request(Finished).', {
      module: 'core',
      submodule: 'api-request',
      data: {
        req: {
          method: req.method,
          url: req.url,
          ip: req.ip,
          user: user,
          moment: new Date().toISOString()
        },
        res: {
          statusCode: res.statusCode
        }
      }
    });
  });

  res.on('close', function onResClose() {
    if (req.finished == true) {
      return;
    }
    var user = {}
    if (req.loggedUser) {
      user = {
        id: req.loggedUser.id,
        username: req.loggedUser.usuario,
        sucursal: req.loggedUser.SucursalId,
        email: req.loggedUser.email,
      }
    }
     saveSystemLog(req, res, false);
    global.app.utils.logger.info('API request(Closed by User).', {
      module: 'core',
      submodule: 'api-request',
      data: {
        req: {
          method: req.method,
          url: req.url,
          ip: req.ip,
          user: user,
          moment: new Date().toISOString()
        },
        res: {
          statusCode: res.statusCode
        }
      }
    });
  });
  next();
});









// loading Db configuration
var db         = require('./common/db');
const { models } = require('mongoose');
global.app.orm = db;
global.jsonAPI=global.app.utils.jsonAPI;
global.app.emailTemplates={}










async.series([
  function (cb) {
    // Setup database connections.
    db.setupDB(function (error) {
      if (error) {
        return cb(error);
      }
      cb();
    });
  },

  function (cb) {
    // Initializing routing system.
    global.app.utils.initOnModules({
      hook: function hookRegisteringRoutes(module, itemPath, cbHook) {
        if ('setRoutes' in module) {
          try {
            module.setRoutes();
          }
          catch (error) {
            return cbHook(error);
          }
        }
        cbHook();
      },
      cb  : function onFinishRegisteringRoutes(error) {
        if (error) {
          global.app.utils.logger.error(error, {
            module   : 'core',
            submodule: 'routes',
            stack    : error.stack
          });
          return cb(error);
        }
        global.app.utils.logger.info('Routes were setup successfully.', {
          module   : 'core',
          submodule: 'routes'
        });
        cb();
      }
    });
  },
  function (cb) {
    // Initializing tasks system.
    global.app.utils.initOnModules({
      hook: function hookRegisteringTasks(module, itemPath, cbHook) {
        if ('loadTasks' in module) {
          try {
            console.log('load tasks');
            module.loadTasks();
          }
          catch (error) {
            return cbHook(error);
          }
        }
        cbHook();
      },
      cb  : function onFinishRegisteringTasks(error) {
        if (error) {
          global.app.utils.logger.error(error, {
            module   : 'core',
            submodule: 'tasks',
            stack    : error.stack
          });
          return cb(error);
        }
        global.app.utils.logger.info('Tasks were setup successfully.', {
          module   : 'core',
          submodule: 'tasks'
        });
        cb();
      }
    });
  },
  function (cb) {
    if (!global.app.config.get('mailer:enabled')) {
      global.app.utils.logger.info('Not registering email templates since mailer is disabled in config.', {
        module   : 'core',
        submodule: 'emails'
      });
      return cb();
    }

    // Registering email templates.
    global.app.utils.initOnModules({
      hook: function hookRegisteringTasks(module, itemPath, cbHook) {
        if ('loadEmails' in module) {
          try {
            module.loadEmails();
          }
          catch (error) {
            return cbHook(error);
          }
        }
        cbHook();
      },
      cb  : function onFinishRegisteringTasks(error) {
        if (error) {
          global.app.utils.logger.error(error, {
            module   : 'core',
            submodule: 'emails',
            stack    : error.stack
          });
          return cb(error);
        }
        global.app.utils.logger.info('Email templates were registered successfully.', {
          module   : 'core',
          submodule: 'emails'
        });
        cb();
      }
    });
  },
  function (cb) {
    require('./common/utils/hooks-handler').start();
    global.app.utils = require('./common/utils/index');
    global.app.security = require('./common/middleware').auth;

    cb();
  }

],
function (error) {

  if (error) {
    // Do nothing. This error is already handled by the innermost package.
    // For now, log a final error and do not start the server.
    global.app.utils.logger.error('Application won\'t start due init errors.', {
      module   : 'core',
      submodule: 'init',
      stack    : error.stack
    });
    // Exit the app with error status.
    throw new Error(error);
  }

  // Register the 500 error express handler.
  app.use(function (errorUseMiddleware,
                    req,
                    res,
                    next) {
    global.app.utils.logger.error(errorUseMiddleware, {
      module   : 'core',
      submodule: 'middleware',
      stack    : errorUseMiddleware.stack
    });
    res.status(500).json({});
  });

  // Register the 500 error express handler.
  app.use(function (errorUseMiddleware,
                    req,
                    res,
                    next) { // Signature needed even when not used since it is what it set it as an error middleware.

    global.app.utils.logger.error(errorUseMiddleware, {
      module   : 'core',
      submodule: 'middleware',
      stack    : errorUseMiddleware.stack
    });
    res.status(500).json(utils.jsonAPI.processErrors(errorUseMiddleware));
  });

  var serverCreator;
  /*
  var selfSignedKeysPath = path.join('keys', 'self-signed');

  var httpsOptions       = {
    key : fs.readFileSync(path.join(selfSignedKeysPath, 'key.pem')),
    cert: fs.readFileSync(path.join(selfSignedKeysPath, 'cert.pem'))
  };*/

  app.use(function (req, res, next) {
    eventHandler.emit("consumo", {
        url: req.url,
        info: "Mensaje desde el app.js del server de sockets"
    })
    return res.status(200).json({
        ok: true
    });
  })

  serverCreator = http.createServer.bind(this, app);

  var server = serverCreator()
    .on('error', function onServerError(errorOnCreateServer) {
      if (errorOnCreateServer.syscall !== 'listen') {
        throw errorOnCreateServer;
      }

      // Handle specific listen errors with friendly messages.
      if (errorOnCreateServer.code === 'EACCES') {
        global.app.utils.logger.error(app.get('port') + ' requires elevated privileges.', {
          module   : 'core',
          submodule: 'init',
          stack    : errorOnCreateServer.stack
        });
        throw new Error(errorOnCreateServer);
      }
      else if (errorOnCreateServer.code === 'EADDRINUSE') {
        global.app.utils.logger.error(app.get('port') + ' is already in use.', {
          module   : 'core',
          submodule: 'init',
          stack    : errorOnCreateServer.stack
        });
        throw new Error(errorOnCreateServer);
      }
      throw errorOnCreateServer;
    });

  //socket connection
  var socket = require('./common/socket');
  socket.create(server);

  server.listen(global.app.config.get("api:port"), global.app.config.get("api:host"), function () {
    var address = server.address();
    var bind    = typeof address === 'string'
                  ? 'pipe ' + address
                  : 'port ' + address.port;

    global.app.utils.logger.info('HTTP  server listening on ' + bind + '.', {
      module   : 'core',
      submodule: 'init'
    });

    // Log uncaught errors and act accordingly.
    // http://shapeshed.com/uncaught-exceptions-in-node
    process.on('uncaughtException', function onUncaughtException(errorOnUncaught) {
      global.app.utils.logger.error(errorOnUncaught, {
        module   : 'core',
        submodule: 'uncaught',
        stack    : errorOnUncaught.stack
      });
      // Exit the app with error status.
      throw new Error(errorOnUncaught);
    });
  });
});
