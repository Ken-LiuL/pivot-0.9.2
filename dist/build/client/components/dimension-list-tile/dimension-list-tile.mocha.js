"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var index_1 = require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var mocks_1 = require('../../../common/models/mocks');
describe('DimensionListTile', function () {
    var DimensionListTile = index_1.mockRequireEnsure('./dimension-list-tile').DimensionListTile;
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(DimensionListTile, {clicker: null, essence: mocks_1.EssenceMock.wikiTotals(), menuStage: null, triggerFilterMenu: null, triggerSplitMenu: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('dimension-list-tile');
    });
});
