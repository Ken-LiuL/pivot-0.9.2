"use strict";
var chai_1 = require('chai');
var React = require('react');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var dimension_actions_menu_1 = require('./dimension-actions-menu');
var mocks_1 = require('../../../common/models/mocks');
describe('DimensionActionsMenu', function () {
    it('adds the correct class', function () {
        var openOn = document.createElement('div');
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(dimension_actions_menu_1.DimensionActionsMenu, {clicker: null, containerStage: mocks_1.StageMock.defaultA(), dimension: mocks_1.DimensionMock.countryURL(), direction: 'right', essence: mocks_1.EssenceMock.wikiTotals(), onClose: null, openOn: openOn, triggerFilterMenu: null, triggerSplitMenu: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('dimension-actions-menu');
    });
});
