"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var tile_header_1 = require('./tile-header');
describe('TileHeader', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(tile_header_1.TileHeader, {onDragStart: null, title: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('tile-header');
    });
});
