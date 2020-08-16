'use strict';

var path                 = require('path');
var spawn                = require('child_process').spawn;
var lodash               = require('lodash');
var Sequelize            = require('sequelize');
var noUpdateAttributes   = require('./db-modules/sequelize-noupdate-attributes');
var addProcessFilesHooks = require('./processFilesHooks');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
// To allow automatically setting the transaction to all queries.
var cls              = require('continuation-local-storage');
var namespace        = cls.createNamespace('base-api');
global.app.namespace = namespace;
Sequelize.cls=namespace;
mongoose.Promise=bluebird;
var mixins = {};//require('./models');

var dbConfig = global.app.config.get('database');
var wasLoadedMongo = false;
var activeDialect  = dbConfig.activeDialect;
var defaultOptions = dbConfig.defaultOptions;

var overridenOptions = {
  dialect: activeDialect,
  define : {
    paranoid   : true,
    underscored: false
  }
};

var activeDbConfig     = lodash.merge({},
  overridenOptions, defaultOptions,
  dbConfig.dialects[activeDialect],
  {
    logging         : false,
  },
  {}
);
global.app.utils.logger.info('Starting db, active dialect: ' + activeDialect + ', ', {
  module   : 'core',
  submodule: 'db'
});

var sequelize = new Sequelize(
  activeDbConfig.database,
  activeDbConfig.username,
  activeDbConfig.password,
  activeDbConfig
);


noUpdateAttributes(sequelize);
addProcessFilesHooks(sequelize);
async function wait(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(async function () {
      if (wasLoadedMongo==false) {
        console.log("cargando")
        return wait(time).then(function(){
            return resolve();
        })
      } else {
        console.log("Loadssssssssss")
        return resolve();
      }
    }, time)
  })
}

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  mixins: mixins,

  setupDB: async function setupDB(cb) {
    if (global.app.config.get('logging:transports:mongodb:enabled')) {
      setupMongoDbConnection();
      await wait(6);
      console.log("datasssssssss")
    }
    // Is this way since each stage needs to be completed for the next to run.
    // This is not an issue since it will by needed only on app bootstraping.
    //
    // - loadModels
    // - associate models & check for simpleCRUD
    // - loadFixtures (not needed anymore thanks to migrations)
    // - setRoutes
    global.app.utils.initOnModules({
      hook: function hookRegisteringModels(module, itemPath, cbHook) {
        if ('loadModels' in module) {
          try {
            module.loadModels();
          }
          catch (error) {
            console.log(error);
            return cbHook(error);
          }
        }
        cbHook();
      },
      cb  : function onFinishRegisteringModels() {
        // When all raw models are loaded, then associate them.

        var models    = global.app.orm.sequelize.models;
        var modelsArr = Object.keys(models);

        //Associate the models& check for simpleCRUD
        modelsArr.forEach(function (modelName) {
            if ('associate' in models[modelName]) {
              models[modelName].associate();
            }
          }
        );

        //
        // Run pending migrations if it is the development environment.
        // Return early if not since migrations will cause the database
        // corruption if the app is run in more than one thread at the same
        // time.
        //
        //if (global.app.config.get('env') !== 'development') {
        //  return cb();
        //}
        // return cb();
        var sequelizeCliBinaryPath = path.resolve(process.cwd(), 'node_modules', '.bin', 'sequelize');
        var sequelizeMigrations    = spawn('node', [
          sequelizeCliBinaryPath,
          'db:migrate'
        ], {
          env: process.env,
        });

        sequelizeMigrations.stdout.on('data', function (data) {
          var decodedData = data.toString('utf8');
          global.app.utils.logger.info(decodedData, {
            module   : 'core',
            submodule: 'db'
          });
        });

        sequelizeMigrations.stderr.on('data', function (data) {
          var decodedData = data.toString('utf8');

          // Guarding against "fs: re-evaluating native module sources is not supported."
          // See https://github.com/nodejs/node/pull/5102
          // Right now can't do anything to fix the error, but to skip it.
          // In Node.js v7 will throw an error instead, but we have to wait until
          // module developers update its `graceful-js` dependency by themselves.
          if (decodedData.search(/fs: re-evaluating native module sources is not supported./) !== -1) {
            return;
          }

          global.app.utils.logger.error(decodedData, {
            module   : 'core',
            submodule: 'db',
            stack    : decodedData
          });
          sequelizeMigrations.kill('SIGHUP');
          cb(decodedData);
        });

        sequelizeMigrations.on('error', function (error) {
          global.app.utils.logger.error(error, {
            module   : 'core',
            submodule: 'db',
            stack    : error
          });
          cb(error);
        });

        sequelizeMigrations.on('exit', function () {
          global.app.utils.logger.info('Connection to database established successfully.', {
            module   : 'core',
            submodule: 'db'
          });
          cb();
        });
      }
    });

  }
};




function setupMongoDbConnection() {
  // Build the connection string.
  var url = 'mongodb://';
  if (global.app.config.get('logging:transports:mongodb:username')) {
    url += global.app.config.get('logging:transports:mongodb:username');

    if (global.app.config.get('logging:transports:mongodb:password')) {
      url += ':' + global.app.config.get('logging:transports:mongodb:password');
    }
    url += '@';
  }
  url = global.app.config.get('logging:transports:mongodb:db')
    .replace('mongodb://', url);

  // Open DB connection to database.
  mongoose.connect(url, {
    useNewUrlParser: true,
    server: {
      auto_reconnect: true,
      useUnifiedTopology: true,
      socketOptions: {
        // Needed for long running applications. Prevent 'connection closed' errors.
        keepAlive: 1
      }
    }
  });

  mongoose.connection.on('error', function (error) {
    console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRR")
    wasLoadedMongo = true;
    global.app.logger.error(error, {
      module: 'core',
      submodule: 'logger/db',
      stack: error
    });
  });

  mongoose.connection.once('open', function () {
    if (!global.app.orm.mongoose) {
      mongoose.Promise = bluebird;
      global.app.orm.mongoose = mongoose;
    }
    wasLoadedMongo = true;
    global.app.logger.info('Logs database connection opened.', {
      module: 'core',
      submodule: 'logger/db'
    });
  });
}
