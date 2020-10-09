//require('dotenv').config();
const cron = require('node-cron');
const execFile = require('child_process').execFile;

function CrearBackup(){
    const task = cron.schedule('00 18 * * 0-6', () => {
        console.log('Ejecuntandose salva de la base de datos a las 6:00PM');
        
        var script = execFile(
            `/home/yeni/Documentos/noconformidades/cron/backup.sh`,
            (error, stdout, stderr) => {
              if (error !== null) {
                console.log(`exec error: ${error}`);
              }
              console.log('Backup complete!')
            }
          );
        });
    }

CrearBackup();