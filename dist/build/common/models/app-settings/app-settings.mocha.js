"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var data_source_mock_1 = require('../data-source/data-source.mock');
var app_settings_1 = require('./app-settings');
var app_settings_mock_1 = require('./app-settings.mock');
describe('AppSettings', function () {
    var context = app_settings_mock_1.AppSettingsMock.getContext();
    it('is an immutable class', function () {
        tester_1.testImmutableClass(app_settings_1.AppSettings, [
            app_settings_mock_1.AppSettingsMock.wikiOnlyJS(),
            app_settings_mock_1.AppSettingsMock.wikiTwitterJS(),
            app_settings_mock_1.AppSettingsMock.wikiWithLinkViewJS()
        ], { context: context });
    });
    describe("errors", function () {
        it("errors if there is no matching cluster", function () {
            var js = app_settings_mock_1.AppSettingsMock.wikiOnlyJS();
            js.clusters = [];
            chai_1.expect(function () { return app_settings_1.AppSettings.fromJS(js, context); }).to.throw("Can not find cluster 'druid' for data source 'wiki'");
        });
    });
    describe("upgrades", function () {
        it("deals with old config style", function () {
            var oldJS = {
                customization: {},
                druidHost: '192.168.99.100',
                timeout: 30003,
                sourceListScan: 'auto',
                sourceListRefreshInterval: 10001,
                sourceReintrospectInterval: 10002,
                sourceReintrospectOnLoad: true,
                dataSources: [
                    data_source_mock_1.DataSourceMock.WIKI_JS
                ]
            };
            chai_1.expect(app_settings_1.AppSettings.fromJS(oldJS, context).toJS().clusters).to.deep.equal([
                {
                    "name": "druid",
                    "type": "druid",
                    "host": "192.168.99.100",
                    "sourceListRefreshInterval": 10001,
                    "sourceListScan": "auto",
                    "sourceReintrospectInterval": 10002,
                    "sourceReintrospectOnLoad": true,
                    "timeout": 30003
                }
            ]);
        });
        it("deals with old config style no sourceListScan=disabled", function () {
            var oldJS = {
                druidHost: '192.168.99.100',
                sourceListScan: 'disable',
                dataSources: [
                    data_source_mock_1.DataSourceMock.WIKI_JS
                ]
            };
            chai_1.expect(app_settings_1.AppSettings.fromJS(oldJS, context).toJS().clusters).to.deep.equal([
                {
                    "host": "192.168.99.100",
                    "name": "druid",
                    "sourceListScan": "disable",
                    "type": "druid"
                }
            ]);
        });
    });
    describe("general", function () {
        it("blank", function () {
            chai_1.expect(app_settings_1.AppSettings.BLANK.toJS()).to.deep.equal({
                "clusters": [],
                "customization": {},
                "dataSources": []
            });
        });
        it("converts to client settings", function () {
            var settings = app_settings_mock_1.AppSettingsMock.wikiOnlyWithExecutor();
            chai_1.expect(settings.toClientSettings().toJS()).to.deep.equal({
                "clusters": [
                    {
                        "name": "druid",
                        "type": "druid"
                    }
                ],
                "customization": {
                    "customLogoSvg": "ansvgstring",
                    "headerBackground": "brown",
                    "title": "Hello World"
                },
                "dataSources": [
                    {
                        "attributes": [
                            {
                                "name": "time",
                                "type": "TIME"
                            },
                            {
                                "name": "articleName",
                                "type": "STRING"
                            },
                            {
                                "makerAction": {
                                    "action": "count"
                                },
                                "name": "count",
                                "type": "NUMBER",
                                "unsplitable": true
                            }
                        ],
                        "defaultDuration": "P3D",
                        "defaultFilter": {
                            "op": "literal",
                            "value": true
                        },
                        "defaultPinnedDimensions": [
                            "articleName"
                        ],
                        "defaultSelectedMeasures": [
                            "count"
                        ],
                        "defaultSortMeasure": "count",
                        "defaultTimezone": "Etc/UTC",
                        "dimensions": [
                            {
                                "expression": {
                                    "name": "time",
                                    "op": "ref"
                                },
                                "kind": "time",
                                "name": "time",
                                "title": "Time"
                            },
                            {
                                "expression": {
                                    "name": "articleName",
                                    "op": "ref"
                                },
                                "kind": "string",
                                "name": "articleName",
                                "title": "Article Name"
                            }
                        ],
                        "engine": "druid",
                        "introspection": "none",
                        "measures": [
                            {
                                "expression": {
                                    "action": {
                                        "action": "sum",
                                        "expression": {
                                            "name": "count",
                                            "op": "ref"
                                        }
                                    },
                                    "expression": {
                                        "name": "main",
                                        "op": "ref"
                                    },
                                    "op": "chain"
                                },
                                "name": "count",
                                "title": "Count"
                            },
                            {
                                "expression": {
                                    "action": {
                                        "action": "sum",
                                        "expression": {
                                            "name": "added",
                                            "op": "ref"
                                        }
                                    },
                                    "expression": {
                                        "name": "main",
                                        "op": "ref"
                                    },
                                    "op": "chain"
                                },
                                "name": "added",
                                "title": "Added"
                            }
                        ],
                        "name": "wiki",
                        "refreshRule": {
                            "rule": "fixed",
                            "time": new Date('2016-04-30T12:39:51.350Z')
                        },
                        "source": "wiki",
                        "subsetFilter": null,
                        "timeAttribute": "time",
                        "title": "Wiki"
                    }
                ]
            });
        });
    });
});
