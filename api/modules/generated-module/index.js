'use strict';
  
exports.loadModels = function loadModels() {
    require('./models/autodeploy.js').loadModel();
    require('./models/config.js').loadModel();
    require('./models/contact.js').loadModel();
    require('./models/db.js').loadModel();
    require('./models/deploy.js').loadModel();
    require('./models/documentation.js').loadModel();
    require('./models/enterprise.js').loadModel();
    require('./models/person.js').loadModel();
    require('./models/program.js').loadModel();
    require('./models/project.js').loadModel();
    require('./models/snippets.js').loadModel();
    require('./models/tags.js').loadModel();
    require('./models/to-do.js').loadModel();
    require('./models/web-client.js').loadModel();
  
};

exports.loadTasks = function loadTasks() {
  
};

exports.setRoutes = function setRoutes() {
    require('./routes/autodeploy/registry').registry();
    require('./routes/config/registry').registry();
    require('./routes/contact/registry').registry();
    require('./routes/db/registry').registry();
    require('./routes/deploy/registry').registry();
    require('./routes/documentation/registry').registry();
    require('./routes/enterprise/registry').registry();
    require('./routes/person/registry').registry();
    require('./routes/program/registry').registry();
    require('./routes/project/registry').registry();
    require('./routes/snippets/registry').registry();
    require('./routes/tags/registry').registry();
    require('./routes/to-do/registry').registry();
    require('./routes/web-client/registry').registry();
  
};




