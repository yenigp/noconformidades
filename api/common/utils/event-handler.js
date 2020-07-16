/**
 * Created by zxc on 18/07/17.
 */

var events = require('events');
var eventHandler = new events.EventEmitter();

eventHandler.setMaxListeners(0);

module.exports = eventHandler;
