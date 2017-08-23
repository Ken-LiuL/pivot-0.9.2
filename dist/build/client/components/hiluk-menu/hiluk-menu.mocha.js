"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var mocks_1 = require('../../../common/models/mocks');
var hiluk_menu_1 = require('./hiluk-menu');
describe.skip('HilukMenu', function () {
    it('adds the correct class', function () {
        var openOn = document.createElement('div');
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(hiluk_menu_1.HilukMenu, {essence: mocks_1.EssenceMock.wikiTotals(), onClose: null, openOn: openOn, getUrlPrefix: function () { return 'http://stackoverflow.com/'; }, openRawDataModal: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('hiluk-menu');
    });
});
