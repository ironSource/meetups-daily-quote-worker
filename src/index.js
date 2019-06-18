'use strict';

const config        = require('config');
const workerFactory = require('queue-router').workerFactory;
const Router        = require('queue-router').Router;


async function start() {
    const router = new Router();

    router.add('send_daily_quote', {
        handler: require('./handler').sendDailyQuote
    });


    workerFactory.create('SQS', router, config.sqs)
        .on('error', error => console.error('worker#error', error))
        .init()
        .start();
}


start().then(() => console.info(`Worker running...`));
