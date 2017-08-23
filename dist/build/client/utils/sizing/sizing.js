"use strict";
function getVisibleSegments(segmentWidths, offset, visibleSize) {
    var startIndex = 0;
    var shownColumns = 0;
    var curWidth = 0;
    for (var i = 0; i < segmentWidths.length; i++) {
        var segmentWidth = segmentWidths[i];
        var afterWidth = curWidth + segmentWidth;
        if (afterWidth < offset) {
            startIndex++;
        }
        else if (curWidth < offset + visibleSize) {
            shownColumns++;
        }
        curWidth = afterWidth;
    }
    return {
        startIndex: startIndex,
        shownColumns: shownColumns
    };
}
exports.getVisibleSegments = getVisibleSegments;
