require('dotenv').config();
var lodash = require('lodash');
var path        = require('path');
var exec = require('child_process').exec;

var dbOptions = {
    user: 'yeni',
    pass: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
};


//retorna si la variable es vacía o no
exports.empty = function (mixedVar) {
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            return false;
        }
        return true;
    }
    return false;
};


//Script autoBackup
 dbRestore = function(){
        var cmd = `pg_restore -i -h ${exportFrom.host} -p ${dbOptions.port} -U ${dbOptions.user} -d ${dbOptions.database} -v ${req.body.restore} -W`

        exec([cmd, process.env.DB_PASSWORD], (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
          console.log('Restore complete!')
        }
      );
    }