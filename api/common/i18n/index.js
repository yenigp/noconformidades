/**
 * Created by zxc on 4/10/17.
 */
var listLanguage = {};
var fs           = require('fs');
var path         = require('path');
function setListLanguage() {
  console.log('Iniciando los idiomas=========================================');
  var basePath = __dirname + path.sep + 'list';
  fs.readdirSync(basePath)
    .forEach(function (file) {
      var data                         = fs.readFileSync(basePath + path.sep + file, 'utf8');
      data                             = JSON.parse(data);
      listLanguage[file.split('.')[0]] = data;
    });
}
setListLanguage();

module.exports = listLanguage;