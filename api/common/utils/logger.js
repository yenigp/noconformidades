
'use strict';

var winston = require('winston');

winston.remove(winston.transports.Console);

winston.add(winston.transports.Console,
  global.app.config.get('utils:logger')
);

exports.logger = winston;
