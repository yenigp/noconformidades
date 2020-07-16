'use strict';

var fs    = require('fs');
var path  = require('path');
var async = require('async');

/**
 * Recursive function to provide execution hooks in the modules.
 *
 * @param {Object}    options           - An options hash needed by the function.
 * @param {Function}  options.hook      - The logic that will be executed on the
 *                                        loaded module.
 * @param {Function}  options.cb        - A callback function to let know when the
 *                                        logic execution has ended thus, supporting
 *                                        async logic.
 */
module.exports = function initOnModules(options) {
  loadModules(
    path.dirname(require.main.filename) + path.sep + 'modules',
    options.hook,
    options.cb);
};

/**
 * Internal recursive function to provide execution hooks in the modules.
 *
 * @param {String}      modulesPath     - The path were the next modules to process
 *                                        lives.
 * @param {Function}    hook            - The passed down logic that will be executed on the
 *                                        loaded module.
 * @param {Function}    cb              - The passed down callback function to let know when the
 *                                        logic execution has ended thus, supporting
 *                                        async logic.
 */
function loadModules(modulesPath, hook, cb) {
  fs.readdir(modulesPath, function (error, files) {
    // If code === 'ENOENT' it means that the folder doesn't exists, so ignore this case.
    if (error) {
      if (error.code === 'ENOENT') {
        // Was reached the leaf so there are no more sub modules to load.
        return cb(null);
      }
      return cb(error);
    }
    async.eachSeries(files, function (item, cbEach) {
      if (item === 'common') {
        // Ignore the common module, since it doesn't have any `init` method.
        cbEach(null);
        return;
      }

      var itemPath = modulesPath + path.sep + item;
      // Required middle code due needed dynamic nature of the module injection.
      var module   = require(itemPath);

      async.series([
        function (cbSeries) {
          hook(module, itemPath, function (errorSeries) {
            if (errorSeries) {
              return cbSeries(errorSeries);
            }
            cbSeries(null);
          });
        },
        function (cbSeries) {
          // Load sub-modules.
          loadModules(itemPath + path.sep + 'modules', hook, cbSeries);
        }
      ], function (errorEach) {
        if (errorEach) {
          cbEach(errorEach);
          return;
        }
        cbEach(null);
      });
    }, function (errorEachSeries) {
      if (errorEachSeries) {
        cb(errorEachSeries);
        return;
      }
      cb(null);
    });
  });
}