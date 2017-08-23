"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var index_1 = require('../../utils/test-utils/index');
var mocks_1 = require('../../../common/models/mocks');
var TestUtils = require('react-addons-test-utils');
describe('SplitTile', function () {
    var SplitTile = index_1.mockRequireEnsure('./split-tile').SplitTile;
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(SplitTile, {clicker: null, essence: mocks_1.EssenceMock.wikiTotals(), menuStage: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('split-tile');
    });
});
