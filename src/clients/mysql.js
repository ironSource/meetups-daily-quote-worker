'use strict';
const mysql   = require('mysql');
const config  = require('config');
const Promise = require('bluebird');


exports.saveDailyQuote = async (to, dailyQuote) => {
    const connection = mysql.createConnection(config.mysql);

    connection.connect();
    Promise.promisifyAll(connection);
    await connection.queryAsync(`insert into daily_quote (daily_quote) values('${dailyQuote}')`);
    connection.end();
};