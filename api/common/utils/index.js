/**
 * Created by zxc on 2/03/18.
 */

module.exports = {
  logger       : require("./logger").logger,
  initOnModules: require('./init-on-modules'),
  jsonAPI      : require('./json-api'),
  mailer       : require('../mailer').mailer,
  eventHandler : require('./event-handler'),
  paths        : require('./paths'),
  mM        : require('./mismisimo'),
  cipher    : require('./cipher'),
  async     : require('./async'),
  loadrol   : require('./load-rol')
};