const cron = require('node-cron');
const { defaultMaxListeners } = require('stream');
const execFile = require('child_process').execFile;
const mailer = require('../utils/json-api');

function devNotification(data) {
  console.log(data);
  if (data.noMail) {
    return 0;
  }
  //return 0;
  if (!global.app.config.get("developers:sendNotifications")) {
    // inactive dev notification
    return;
  }
  if (typeof data != 'object' || data.subject == undefined) {
    data = {
      subject: 'Dev Notification',
      text   : data
    }
  }
  if (typeof  data.text == 'object') {
    data.text = JSON.stringify(data);
  }
  var mailerConfig = global.app.config.get('mailer');
  if (mailerConfig == undefined ||
      global.app.utils.mailer == undefined ||
      typeof global.app.utils.mailer.sendMail !== 'function') {
    return;
  }

  var mail = {
    from   : mailerConfig.from,
    bcc    : global.app.config.get("developers:mails"),
    subject: data.subject,
    text   : data.text,
    html   : data.text
  };
  global.app.utils.mailer.sendMail(mail,
    function (err, info) {
      if (err) {
        global.app.utils.logger.error('Dev mailer', err.message);
      }
      else {
        global.app.utils.logger.info('Dev mailer', info.response);
        global.app.utils.mailer.close();
      }
    }
  );
}

function CrearBackup(){
    cron.schedule('00 18 * * 0-6', () => {
        console.log('Ejecuntandose salva de la base de datos a las 6:00PM');


        execFile(
            `/home/yeni/Documentos/noconformidades/cron/pg_backup.sh`,
            (error, stdout, stderr) => {
              if (error !== null) {
                console.log(`exec error: ${error}`);
                return devNotification(error);
               
              }
              console.log('Backup complete!')
              return devNotification(stdout);
              
            }
          );
        });
    }

CrearBackup();