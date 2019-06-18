'use strict';

const nodemailer    = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config        = require('config');

function getTransporter() {
    return nodemailer.createTransport(smtpTransport(config.mail));
}

exports.send = async (to, dailyQuote) => {
    const params = {
        from   : {
            name   : 'dailyQuote',
            address: 'nodejs_meetup_2@gmail.com'
        },
        to     : to,
        subject: 'Daily Quote',
        html   : dailyQuote
    };

    return getTransporter().sendMail(params);
};

