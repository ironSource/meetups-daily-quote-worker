'use strict';

const mysqlClient = require('./clients/mysql');
const mailClient  = require('./clients/mail');


exports.sendDailyQuote = async (content) => {
    await mysqlClient.saveDailyQuote(content.to, content.dailyQuote);
    await mailClient.send(content.to, content.dailyQuote);
};
