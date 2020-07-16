'use strict';

var fs          = require('fs');
var path        = require('path');
var validations = require('../../common/utils/validations');
var paths       = require('../../common/utils/paths');
var uuid        = require('uuid');

/**
 * Util to handle file creation on Sequelize hooks from an attribute
 * data URI.
 *
 * @param  {Object}    object            - A Sequelize object that will hold the instance
 *                                        reference so it can be updated.
 * @param  {String}    attribute         - The attribute name that will be processed.
 * @return {Promise}
 */
exports.createFileFromAttributeDataUri = function (object, attribute) {
  var Sequelize = global.app.orm.Sequelize;
  console.log("CREANDO000000000000000000000000")
  console.log("CREANDO000000000000000000000000")
  console.log("CREANDO000000000000000000000000")
  console.log("CREANDO000000000000000000000000")
  console.log("CREANDO000000000000000000000000")

  return Sequelize.Promise.try(function () {
    if (object.dataValues.hasOwnProperty(attribute)) {
      // if (!validations.regex.imageData.test(object[attribute])) {
      //   if (!validations.regex.imageName.test(object[attribute])) {
      //     throw new Sequelize.ValidationError(null, [
      //       new Sequelize.ValidationErrorItem('The ' + attribute + ' has to be a valid encoded data URI', null, attribute)
      //     ]);
      //   }
      //   else {
      //     return Sequelize.Promise.try(function () {
      //     });
      //   }
      // }
      var splittedFileData = object[attribute].split(';base64,');
      var fileExtension    = splittedFileData[0].split('/')[1];
      var fileData         = splittedFileData[1];
      var fileName         = uuid.v4();
      var fullFileName     = fileName + '.' + fileExtension;
      var destination      = paths.public;
      if (splittedFileData[0].startsWith('private')){
        destination = paths.private;
      }

      var writeFile = Sequelize.Promise.promisify(fs.writeFile);
      return writeFile(path.join(process.cwd(), destination, fullFileName), fileData, 'base64')
        .then(function () {
          object[attribute] = destination+'/'+fullFileName;
        });
    }
  });
};

/**
 * Util to handle file file deletion on Sequelize hooks.
 *
 * @param  {Object}    object            - A Sequelize object that will hold the instance
 *                                        reference so it can be updated.
 * @param  {String}    attribute         - The attribute name that will be processed.
 */
exports.destroyFile = function (object, attribute) {
  var Sequelize = global.app.orm.Sequelize;

  // Capture possible errors but not bubble up the error, since this is
  // only as an extra call.
  Sequelize.Promise.try(function () {
    if (object[attribute]) {
      var unlink = Sequelize.Promise.promisify(fs.unlink);
      return unlink(path.join(process.cwd(), object[attribute]));
    }
  });
};

/**
 * Util to handle file file updates on Sequelize hooks from an attribute
 * data URI.
 *
 * @param  {Object}    object            - A Sequelize object that will hold the instance
 *                                        reference so it can be updated.
 * @param  {String}    attribute         - The attribute name that will be processed.
 * @return {Promise}
 */
exports.updateFileFromAttributeDataUri = function (object, attribute) {
  console.log("ACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("ACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("ACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("ACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("ACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  var Sequelize = global.app.orm.Sequelize;
  return Sequelize
    .Promise
    .try(function () {
      if (object._changed[attribute]) {
        if (object._previousDataValues[attribute]) {
          // Capture possible errors but not bubble up the error, since this is
          // only as an extra call.
          var unlink = Sequelize.Promise.promisify(fs.unlink);
          unlink(path.join(process.cwd(), object._previousDataValues[attribute]));
        }

        if (object[attribute]) {
          var splittedFileData = object[attribute].split(';base64,');
          var fileExtension    = splittedFileData[0].split('/')[1];
          var fileData         = splittedFileData[1];
          var fileName         = uuid.v4();
          var fullFileName     = fileName + '.' + fileExtension;
          var writeFile = Sequelize.Promise.promisify(fs.writeFile);
          var destination      = paths.public;
          if (splittedFileData[0].startsWith('private')){
            destination = paths.private;
          }
          return writeFile(path.join(process.cwd(), destination, fullFileName), fileData, 'base64')
            .then(function () {
              console.log("Creada correctamente")
              object[attribute] = destination+'/'+fullFileName;
            });
        }
      }
    });
};