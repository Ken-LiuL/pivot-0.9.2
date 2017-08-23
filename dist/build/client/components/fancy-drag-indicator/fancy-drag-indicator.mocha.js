"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../../common/models/index');
var fancy_drag_indicator_1 = require('./fancy-drag-indicator');
describe('FancyDragIndicator', function () {
    var dragPosition = index_1.DragPosition.fromJS({
        insert: 0
    });
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(fancy_drag_indicator_1.FancyDragIndicator, {dragPosition: dragPosition}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('fancy-drag-indicator');
    });
});
