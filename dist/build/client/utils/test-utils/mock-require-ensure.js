"use strict";
var path_1 = require('path');
var get_caller_file_1 = require('./get-caller-file');
var rewire = require('rewire');
function mockRequireEnsure(path) {
    // Gets the absolute path based on the caller's path
    path = path_1.resolve(path_1.dirname(get_caller_file_1.getCallerFile()), path);
    var mod = rewire(path);
    var mockedRequire = mod.__get__('require');
    mockedRequire.ensure = function (path, callback) { return callback(mockedRequire); };
    return mod;
}
exports.mockRequireEnsure = mockRequireEnsure;
