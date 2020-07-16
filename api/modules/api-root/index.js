'use strict';

exports.setRoutes = function setRoutes() {
  global.app.express
        .route(global.app.config.get('api:prefix'))
        .get(require('./routes/index'));

  global.app.express
        .route('/')
        .get(require('./routes/index'));

  global.app.express
        .route(global.app.config.get('api:prefix')+'/help')
        .get(require('./routes/help'));
};