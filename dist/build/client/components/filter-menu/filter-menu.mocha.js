"use strict";
var chai_1 = require('chai');
var React = require('react');
var index_1 = require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var filter_menu_1 = require('./filter-menu');
var mocks_1 = require('../../../common/models/mocks');
describe('FilterMenu', function () {
    it('adds the correct class', function () {
        var openOn = document.createElement('div');
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(filter_menu_1.FilterMenu, {clicker: null, containerStage: null, dimension: mocks_1.DimensionMock.countryURL(), direction: 'down', essence: mocks_1.EssenceMock.wikiTotals(), changePosition: null, onClose: null, openOn: openOn}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('filter-menu');
    });
});
