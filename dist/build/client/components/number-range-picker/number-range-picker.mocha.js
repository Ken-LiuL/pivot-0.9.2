"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var number_range_picker_1 = require('./number-range-picker');
var mocks_1 = require('../../../common/models/mocks');
describe('NumberRangePicker', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(number_range_picker_1.NumberRangePicker, {start: 2, end: 10, onRangeStartChange: null, essence: mocks_1.EssenceMock.wikiTotals(), dimension: mocks_1.DimensionMock.countryURL(), onRangeEndChange: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('number-range-picker');
    });
});
