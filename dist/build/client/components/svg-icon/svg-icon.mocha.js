"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom/server');
require('../../utils/test-utils/index');
var svg_icon_1 = require('./svg-icon');
describe('SvgIcon', function () {
    it('adds the correct class', function () {
        chai_1.expect(ReactDOM.renderToStaticMarkup(React.createElement(svg_icon_1.SvgIcon, {svg: null}))).to.equal("<svg class=\"svg-icon \" viewBox=\"0 0 16 16\" preserveAspectRatio=\"xMidYMid meet\"><rect width=16 height=16 fill='red'></rect></svg>");
        var svg = "<svg width=\"10px\" height=\"8px\" viewBox=\"0 0 10 8\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M5.00000013,3.79318225 L1.92954627,0.341495392 L0.247423305,1.81335299 L5,7.24486921 Z\"></path>\n    </g>\n</svg>";
        chai_1.expect(ReactDOM.renderToStaticMarkup(React.createElement(svg_icon_1.SvgIcon, {svg: svg}))).to.equal("<svg class=\"svg-icon \" viewBox=\"0 0 10 8\" preserveAspectRatio=\"xMidYMid meet\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M5.00000013,3.79318225 L1.92954627,0.341495392 L0.247423305,1.81335299 L5,7.24486921 Z\"></path>\n    </g>\n</svg>");
        //expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        //expect(((ReactDOM.findDOMNode(renderedComponent) as any).className, 'should contain class').to.contain('svg-icon');
    });
});
