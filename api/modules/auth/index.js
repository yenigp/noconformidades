
var middleware                             = require('../../common/middleware');
var ensureAuthenticated                    = middleware.auth.ensureAuthenticated();


var path = require('path');
const { isAdminSucursal, ensureAdmin, isSucursal, ensureHasPermission, validSucursal, ensureSucursal } = require('../../common/middleware/auth');
var EmailTemplate = require('email-templates').EmailTemplate

exports.loadEmails = function loadEmails() {
      global.app.emailTemplates.newUser = new EmailTemplate(path.join(__dirname, 'emails', 'new-user'));
};


exports.setRoutes = function setRoutes() {
  var authRoute = global.app.config.get('api:prefix') + '/auth';

  var loginRoute = authRoute + '/login';
  global.app.express
        .route(loginRoute)
        .get(require('./routes/login/index'));
  var loginRoute = global.app.config.get('api:prefix') + '/sign-up';
  global.app.express
        .route(loginRoute)
        .post([global.security.ensureAuthenticated(), global.security.ensureSucursal()], require('./routes/sign-up/index'));
      
  var logoutRoute = authRoute + '/logout';
  global.app.express
        .route(logoutRoute)
        .get(ensureAuthenticated, require('./routes/logout/index'));
  
var validateRoute = authRoute + '/validate';

global.app.express
      .route(validateRoute)
      .post(require('./routes/validate/index'));        

};