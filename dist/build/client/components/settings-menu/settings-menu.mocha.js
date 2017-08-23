"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var chronoshift_1 = require('chronoshift');
var settings_menu_1 = require('./settings-menu');
var index_1 = require('../../utils/test-utils/index');
describe('SettingsMenu', function () {
    it('adds the correct class', function () {
        var openOn = document.createElement('div');
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(settings_menu_1.SettingsMenu, {onClose: null, openOn: openOn, changeTimezone: function () { }, timezone: chronoshift_1.Timezone.UTC}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('settings-menu');
    });
});
