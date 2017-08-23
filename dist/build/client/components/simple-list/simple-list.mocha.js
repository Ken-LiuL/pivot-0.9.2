"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var simple_list_1 = require('./simple-list');
describe.skip('SimpleList', function () {
    it('adds the correct class', function () {
        var myRows = [];
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(simple_list_1.SimpleList, {rows: myRows}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('simple-list');
    });
});
