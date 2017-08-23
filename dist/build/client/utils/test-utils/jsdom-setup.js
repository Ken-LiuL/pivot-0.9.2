"use strict";
var jsdom = require('jsdom');
var kickstart = function () {
    var g = global;
    var document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    g.document = document;
    g.window = document.defaultView;
    g.navigator = {
        userAgent: 'testing'
    };
};
var cleanup = function () {
    var g = global;
    delete g.document;
    delete g.window;
    delete g.navigator;
};
// Initial kickstart is neede because of required modules
// (FileSaver, I'm looking at you)
kickstart();
beforeEach(kickstart);
afterEach(cleanup);
