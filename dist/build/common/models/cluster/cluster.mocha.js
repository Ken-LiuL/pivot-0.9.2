"use strict";
var tester_1 = require('immutable-class/build/tester');
var cluster_1 = require('./cluster');
describe('Cluster', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(cluster_1.Cluster, [
            {
                name: 'my-druid-cluster',
                type: 'druid'
            },
            {
                name: 'my-druid-cluster',
                type: 'druid',
                host: '192.168.99.100',
                version: '0.9.1',
                timeout: 30000,
                sourceListScan: 'auto',
                sourceListRefreshOnLoad: true,
                sourceListRefreshInterval: 10000,
                sourceReintrospectInterval: 10000,
                introspectionStrategy: 'segment-metadata-fallback'
            },
            {
                name: 'my-mysql-cluster',
                type: 'mysql',
                host: '192.168.99.100',
                timeout: 30000,
                sourceListScan: 'auto',
                sourceListRefreshInterval: 10000,
                sourceReintrospectOnLoad: true,
                sourceReintrospectInterval: 10000,
                database: 'datazoo',
                user: 'datazoo-user',
                password: 'koalas'
            },
            {
                name: 'my-mysql-cluster',
                type: 'druid',
                host: '192.168.99.100',
                timeout: 30000,
                sourceListScan: 'auto'
            },
            {
                name: 'my-mysql-cluster',
                type: 'druid',
                host: '192.168.99.100',
                timeout: 30000,
                sourceListScan: 'auto',
                sourceListRefreshInterval: 0,
                sourceReintrospectInterval: 0
            }
        ]);
    });
});
