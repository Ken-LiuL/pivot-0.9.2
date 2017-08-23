"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var mocks_1 = require('../../../common/models/mocks');
var index_1 = require('../../utils/test-utils/index');
var number_filter_menu_1 = require('./number-filter-menu');
describe('NumberFilterMenu', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(number_filter_menu_1.NumberFilterMenu, {clicker: null, dimension: mocks_1.DimensionMock.time(), essence: mocks_1.EssenceMock.wikiTotals(), onClose: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('number-filter-menu');
    });
});
