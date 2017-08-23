"use strict";
var plywood_1 = require('plywood');
var plywood_druid_requester_1 = require('plywood-druid-requester');
var plywood_mysql_requester_1 = require('plywood-mysql-requester');
var plywood_postgres_requester_1 = require('plywood-postgres-requester');
function properRequesterFactory(options) {
    var type = options.type, host = options.host, retry = options.retry, timeout = options.timeout, verbose = options.verbose, concurrentLimit = options.concurrentLimit;
    var requester;
    switch (type) {
        case 'druid':
            requester = plywood_druid_requester_1.druidRequesterFactory({
                host: host,
                timeout: timeout || 30000,
                requestDecorator: options.druidRequestDecorator
            });
            break;
        case 'mysql':
            requester = plywood_mysql_requester_1.mySqlRequesterFactory({
                host: host,
                database: options.database,
                user: options.user,
                password: options.password
            });
            break;
        case 'postgres':
            requester = plywood_postgres_requester_1.postgresRequesterFactory({
                host: host,
                database: options.database,
                user: options.user,
                password: options.password
            });
            break;
        default:
            throw new Error("unknown requester type " + type);
    }
    if (retry) {
        requester = plywood_1.helper.retryRequesterFactory({
            requester: requester,
            retry: retry,
            delay: 500,
            retryOnTimeout: false
        });
    }
    if (verbose) {
        requester = plywood_1.helper.verboseRequesterFactory({
            requester: requester
        });
    }
    if (concurrentLimit) {
        requester = plywood_1.helper.concurrentLimitRequesterFactory({
            requester: requester,
            concurrentLimit: concurrentLimit
        });
    }
    return requester;
}
exports.properRequesterFactory = properRequesterFactory;
