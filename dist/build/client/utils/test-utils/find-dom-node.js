"use strict";
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var body_portal_1 = require('../../components/body-portal/body-portal');
function findDOMNode(element) {
    var portal = TestUtils.scryRenderedComponentsWithType(element, body_portal_1.BodyPortal)[0];
    return portal ? portal.target.childNodes[0] : ReactDOM.findDOMNode(element);
}
exports.findDOMNode = findDOMNode;
