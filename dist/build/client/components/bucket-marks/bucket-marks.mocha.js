"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
require('../../utils/test-utils/index');
var bucket_marks_1 = require('./bucket-marks');
var mocks_1 = require('../../../common/models/mocks');
describe('BucketMarks', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(bucket_marks_1.BucketMarks, {stage: mocks_1.StageMock.defaultA(), ticks: [], scale: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('bucket-marks');
    });
});
