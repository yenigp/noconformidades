/**
 * Created by zxc on 19/07/17.
 */
function authenticate(socketConnection, next) {
  var auth = socketConnection.handshake.query.Authorization;

  if (!auth) {
    return;
  }
  auth = auth.split(' ');

  function nextS(error, person) {
    if (person != undefined && person.dataValues != undefined && !error) {
      socketConnection.request.user = {
        id          : person.dataValues.id,
        isSuperAdmin: person.dataValues.level == undefined,
        username    : person.dataValues.username
      };
      next(error);
    }
  }

  if (auth[0] == 'Basic') {
    /**
     * proceed
     * */

    auth = new Buffer(auth[0], 'base64').toString();
    var pos = auth.indexOf(':');
    if (pos == -1 || pos == auth.length - 1) {
      return;
    }
    var username = auth.substr(0, pos);
    var password = auth.substr(pos + 1, auth.length);
    if (username.length == 0) {
      return;
    }

    /**
     * todo checkear user y password
     * */
    return require('./middleware/auth.js')
      .basicStrategyVerifyCallback(username, password, nextS);

  }
  else if (auth[0] == 'Bearer') {
    /**
     * proceed
     * */
    ;

    console.log('beareando##################################################################################');
    return require('./middleware/auth.js').basicCheckUser(auth[1], nextS);
  }
  else {
    return;
  }

}

exports.authenticate = authenticate;