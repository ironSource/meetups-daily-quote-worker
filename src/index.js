'use strict';

const config        = require('config');
const workerFactory = require('queue-router').workerFactory;
const Router        = require('queue-router').Router;
const mysqlClient   = require('./clients/mysql');
const mailClient    = require('./clients/mail');

const handler = async (content) => {
    await mysqlClient.saveDailyQuote(content.to, content.dailyQuote);
    await mailClient.send(content.to, content.dailyQuote);
    console.log('message_processed');
};

async function start() {
    const router = new Router();

    router.add('SEND_DAILY_QUOTE', { handler });

    // uses aws-sdk receiveMessage under the hood
    workerFactory.create('SQS', router, config.sqs)
        .on('error', error => console.error('worker#error', error))
        .init()
        .start();
}


start().then(() => console.info(`Worker running...`));
