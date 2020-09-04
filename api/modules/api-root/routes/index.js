'use strict';

module.exports = function(req, res) {
  var absoluteNewLinkPath = [
    req.protocol,
    '://',
    req.hostname,
    ':',
    global.app.config.get('api:port'),
    global.app.config.get('api:prefix')
  ].join('');

  // Public links.
  var jsonAPIBody = {
    links: {
      "help": absoluteNewLinkPath + '/help',
      "signup": absoluteNewLinkPath + '/sign-up',
      "login": absoluteNewLinkPath + '/auth/login',
      "logout": absoluteNewLinkPath + '/auth/logout',
      "Person": absoluteNewLinkPath + "/person",
      "PersonHelp": absoluteNewLinkPath + "/person-help",
      "_": absoluteNewLinkPath + "/_",
      "_Help": absoluteNewLinkPath + "/_-help",
      "?": absoluteNewLinkPath + "/?",
      "?Help": absoluteNewLinkPath + "/?-help",
      "Project": absoluteNewLinkPath + "/project",
      "ProjectHelp": absoluteNewLinkPath + "/project-help",
      "Config": absoluteNewLinkPath + "/config",
      "ConfigHelp": absoluteNewLinkPath + "/config-help",
      "Program": absoluteNewLinkPath + "/program",
      "ProgramHelp": absoluteNewLinkPath + "/program-help",
      "WebClient": absoluteNewLinkPath + "/web-client",
      "WebClientHelp": absoluteNewLinkPath + "/web-client-help",
      "Autodeploy": absoluteNewLinkPath + "/autodeploy",
      "AutodeployHelp": absoluteNewLinkPath + "/autodeploy-help",
      "Db": absoluteNewLinkPath + "/db",
      "DbHelp": absoluteNewLinkPath + "/db-help",
      "Snippets": absoluteNewLinkPath + "/snippets",
      "SnippetsHelp": absoluteNewLinkPath + "/snippets-help",
      "Tags": absoluteNewLinkPath + "/tags",
      "TagsHelp": absoluteNewLinkPath + "/tags-help",
      "ToDo": absoluteNewLinkPath + "/to-do",
      "ToDoHelp": absoluteNewLinkPath + "/to-do-help",
      "Turista": absoluteNewLinkPath + "/turista",
      "TuristaHelp": absoluteNewLinkPath + "/turista-help",

    }
  };
  return res.status(200).json(jsonAPIBody); // OK.
};
