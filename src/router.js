'use strict';

const config                        = require('config');
const KoaRouter                     = require('koa-router');
const Router                        = require('queue-router').Router;
const health                        = require('./controllers/api/health');
const CreateSalesforceLeads         = require('./controllers/daemon/CreateSalesforceLeads');

const RedisClient       = require('./clients/redisClient');
const mailClient        = require('./clients/mail');
const Mysql             = require('./clients/Mysql');

exports.getHttpRouter = () => {
    const koaRouter = new KoaRouter();
    koaRouter.get('/management/health', health.getStatus);

    return koaRouter;
};

exports.getWorkerRouter = async () => {

    return router;
};
