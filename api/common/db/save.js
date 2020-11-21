var fs = require('fs');
var lodash = require('lodash');
var path        = require('path');
var exec = require('child_process').exec;

var dbOptions = {
    user: 'yeni',
    pass: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
    restoreBackup: true,
    removeOldBackup: true,
    keeplastDayBackup: 2,
    autoBackupPath: '/home/yeni/Documentos/noconformidades/cron/backups',
};

exports.stringToDate = function (dateString) {
    return new Date(dateString);
}

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

//Chequeando que existe los directorios del backup y el archivo log
    if (! fs.existsSync(dbOptions.autoBackupPath)){
        fs.mkdirSync(dbOptions.autoBackupPath)        
    }


//Script autoBackup
 dbAutoBackup = function(){
    //Chequeando que el auto backup este habilitado o desabilitado
    if (dbOptions.autoBackup == true) {
        var date = new Date();
        var logFile = dbOptions.autoBackupPath + (dbOptions.database + '-' + date) + '.log';
        if (! fs.existsSync(logFile)){
            var out = fs.createWriteStream(logFile, { encoding: "utf8" });
            out.write(str);
            out.end(); 
        };
        var beforeDate, oldBackupDir, oldBackupPath;
        currentDate = this.stringToDate(date);
        var  newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDate()) + '-' + (currentDate.getHours()) + '-' + (currentDate.getMinutes());
        var newBackupPath = dbOptions.autoBackupPath + 'postgresqldump-' + newBackupDir;
        //Chequeando que se eliminó el backup anterior 
        if (dbOptions.removeOldBackup == true) {
            beforeDate = _.clone(currentDate);
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keeplastDayBackup);
            oldBackupDir = beforeDate.getFullYear()+ '-' + (beforeDate.getMonth() + 1) + '-' + (beforeDate.getDate()) + '-' + (beforeDate.getHours()) + '-' + (beforeDate.getMinutes());
            oldBackupPath = dbOptions.autoBackupPath + 'postgresqldump-' + oldBackupDir; 
        }
        var cmd = `pg_dump -d ${dbOptions.database} -h ${exportFrom.host} -p ${dbOptions.port} -U ${dbOptions.user} > ${newBackupPath}`

        exec(cmd, function (error, stdout, stderr) {
            if (this.empty(error)) {
                console.log ('No se hizo nada');
                //Chequeando que se eliminó el backup anterior
                if (dbOptions.removeOldBackup == true) {
                    if (fs.existsSync(oldBackupPath)) {
                        exec("rm -rf" + oldBackupPath, function (err) {});
                    }
                }
            }
        });
    }
}

