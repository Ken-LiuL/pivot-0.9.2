"use strict";
var SplitCombineMock = (function () {
    function SplitCombineMock() {
    }
    Object.defineProperty(SplitCombineMock, "TIME_JS", {
        get: function () {
            return {
                expression: { op: 'ref', name: 'time' },
                sortAction: {
                    action: 'sort',
                    direction: 'ascending',
                    expression: {
                        op: 'ref',
                        name: 'time'
                    }
                },
                limitAction: {
                    action: 'limit',
                    limit: 2
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return SplitCombineMock;
}());
exports.SplitCombineMock = SplitCombineMock;
