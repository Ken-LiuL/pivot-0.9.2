"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var mocks_1 = require('../../../common/models/mocks');
var measures_tile_1 = require('./measures-tile');
describe('MeasuresTile', function () {
    it('adds the correct class', function () {
        var fakeClicker = {
            toggleEffectiveMeasure: function () { },
            toggleMultiMeasureMode: function () { }
        };
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(measures_tile_1.MeasuresTile, {clicker: fakeClicker, essence: mocks_1.EssenceMock.wikiTotals()}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('measures-tile');
    });
});
