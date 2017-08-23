"use strict";
var stage_1 = require('./stage');
var StageMock = (function () {
    function StageMock() {
    }
    Object.defineProperty(StageMock, "DEFAULT_A_JS", {
        get: function () {
            return {
                x: 10,
                y: 5,
                height: 2,
                width: 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageMock, "DEFAULT_B_JS", {
        get: function () {
            return {
                x: 10,
                y: 500,
                height: 2,
                width: 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageMock, "DEFAULT_C_JS", {
        get: function () {
            return {
                x: 10,
                y: 5,
                height: 3,
                width: 2
            };
        },
        enumerable: true,
        configurable: true
    });
    StageMock.defaultA = function () {
        return stage_1.Stage.fromJS(StageMock.DEFAULT_A_JS);
    };
    StageMock.defaultB = function () {
        return stage_1.Stage.fromJS(StageMock.DEFAULT_B_JS);
    };
    return StageMock;
}());
exports.StageMock = StageMock;
