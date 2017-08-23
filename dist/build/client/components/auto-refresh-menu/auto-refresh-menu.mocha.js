"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var mocks_1 = require('../../../common/models/mocks');
var auto_refresh_menu_1 = require('./auto-refresh-menu');
describe('AutoRefreshMenu', function () {
    it('adds the correct class', function () {
        var openOn = document.createElement('div');
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(auto_refresh_menu_1.AutoRefreshMenu, {onClose: null, openOn: openOn, autoRefreshRate: null, setAutoRefreshRate: null, refreshMaxTime: null, dataSource: mocks_1.DataSourceMock.wiki()}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('auto-refresh-menu');
    });
});
