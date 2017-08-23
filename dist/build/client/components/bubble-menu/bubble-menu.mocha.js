"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var bubble_menu_1 = require('./bubble-menu');
var mocks_1 = require('../../../common/models/mocks');
describe('BubbleMenu', function () {
    it('adds the correct class', function () {
        var openOn = document.createElement('div');
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(bubble_menu_1.BubbleMenu, {children: null, className: null, containerStage: null, direction: 'right', onClose: null, openOn: openOn, stage: mocks_1.StageMock.defaultA()}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('bubble-menu');
    });
});
