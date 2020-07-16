'use strict';

var nodemailer   = require('nodemailer');
var mailerConfig = global.app.config.get('mailer');
var activeService = mailerConfig.activeService;
var options       = mailerConfig.services[activeService];
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter = nodemailer.createTransport(options);

exports.mailer = transporter;