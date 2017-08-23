"use strict";
var chai_1 = require('chai');
var React = require('react');
var index_1 = require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var about_modal_1 = require('./about-modal');
describe('AboutModal', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(about_modal_1.AboutModal, {version: '0.9.123', onClose: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('about-modal');
    });
});
