"use strict";
var constants_1 = require('../../config/constants');
exports.SECTION_WIDTH = constants_1.CORE_ITEM_WIDTH + constants_1.CORE_ITEM_GAP;
function getWidthNoOverflowAdjustment(stageWidth) {
    return stageWidth - constants_1.BAR_TITLE_WIDTH - constants_1.VIS_SELECTOR_WIDTH + constants_1.CORE_ITEM_GAP;
}
function getMaxItems(stageWidth, itemsLength) {
    var maxWidth = getWidthNoOverflowAdjustment(stageWidth);
    var includedItems = itemsLength;
    var initialMax = Math.floor((maxWidth - constants_1.OVERFLOW_WIDTH) / exports.SECTION_WIDTH);
    if (initialMax < includedItems) {
        var widthPlusOverflow = initialMax * exports.SECTION_WIDTH + constants_1.OVERFLOW_WIDTH + constants_1.CORE_ITEM_GAP;
        var maxItems = null;
        if (maxWidth < widthPlusOverflow) {
            maxItems = initialMax - 1;
        }
        else if (includedItems - initialMax === 1) {
            maxItems = Math.floor(maxWidth / exports.SECTION_WIDTH);
        }
        else {
            maxItems = initialMax;
        }
        return maxItems;
    }
    else {
        return initialMax;
    }
}
exports.getMaxItems = getMaxItems;
