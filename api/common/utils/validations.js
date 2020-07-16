'use strict';

exports.regex = {
  hexColor : /^#([a-f0-9]{6}|[a-f0-9]{3})$/i,
  //imageData: /^\w+.*$/i,
  imageData: /^(data:)?((image)|(application))+\/[a-z]+;base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/i,
  imageName: /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}\.[A-Za-z0-9]{3}([A-Za-z0-9]{1})?$/,
  duration : /^P(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?W)?(?:\d+(?:\.\d+)?D)?(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$/
};