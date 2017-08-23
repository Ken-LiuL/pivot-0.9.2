"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
require('../../utils/test-utils/index');
var modal_1 = require('./modal');
describe('Modal', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(modal_1.Modal, {title: "Modal", onClose: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('modal');
    });
});
