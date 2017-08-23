"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var immutable_input_1 = require('./immutable-input');
describe.skip('ImmutableInput', function () {
    it('adds the correct class', function () {
        var myImmutableInstance;
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(immutable_input_1.ImmutableInput, {instance: myImmutableInstance, path: 'pouet'}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('immutable-input');
    });
});
