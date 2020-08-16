'use strict';

var processFile = require('../../common/utils/process-file');
var lodash = require('lodash');

module.exports = function (sequelize) {
  var possibleImageAttributesMap = [
    'logo',
    'image',
    'photo',
    'banner',
    'avatar',
    "mainImage",
    "file"
  ];

  sequelize.addHook('beforeCreate', function (object) {
    var Sequelize = global.app.orm.Sequelize;
    var promiseArray = [];

    lodash.forEach(possibleImageAttributesMap, function (item) {
      if (object[item]) {
        console.log("AGREGANDO PARA GUARDAR::", item)

        promiseArray.push(processFile.createFileFromAttributeDataUri(object, item));
      }
    });

    return Sequelize.Promise.all(promiseArray);
  });

  sequelize.addHook('beforeUpdate', function (object) {
    console.log("VAYAAAAAAAAAAAAAAAAAAAAAAAA............")
    var Sequelize = global.app.orm.Sequelize;
    var promiseArray = [];
    lodash.forEach(possibleImageAttributesMap, function (item) {
      if (object[item]) {
        promiseArray.push(processFile.updateFileFromAttributeDataUri(object, item));
      }
    });

    return Sequelize.Promise.all(promiseArray);
  });

  sequelize.addHook('afterDestroy', function (object) {
    lodash.forEach(possibleImageAttributesMap, function (item) {
      if (object[item]) {
        processFile.destroyFile(object, item);
      }
    });
  });
};
