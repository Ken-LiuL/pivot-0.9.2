"use strict";
exports.TITLE_HEIGHT = 36;
// Core = filter + split
exports.DIMENSION_HEIGHT = 27;
exports.MEASURE_HEIGHT = 27;
exports.CORE_ITEM_WIDTH = 192;
exports.CORE_ITEM_GAP = 8;
exports.BAR_TITLE_WIDTH = 66;
exports.PIN_TITLE_HEIGHT = 36;
exports.PIN_ITEM_HEIGHT = 25;
exports.PIN_PADDING_BOTTOM = 12;
exports.VIS_H_PADDING = 10;
exports.VIS_SELECTOR_WIDTH = 79;
exports.OVERFLOW_WIDTH = 40;
exports.SPLIT = 'SPLIT';
exports.MAX_SEARCH_LENGTH = 300;
exports.SEARCH_WAIT = 900;
exports.STRINGS = {
    home: 'Home',
    settings: 'Settings',
    dimensions: 'Dimensions',
    measures: 'Measures',
    filter: 'Filter',
    split: 'Split',
    subsplit: 'Split',
    sortBy: 'Sort by',
    limit: 'Limit',
    pin: 'Pin',
    pinboard: 'Pinboard',
    pinboardPlaceholder: 'Click or drag dimensions to pin them',
    granularity: 'Granularity',
    relative: 'Relative',
    specific: 'Specific',
    noFilter: 'No filter',
    latest: 'Latest',
    current: 'Current',
    previous: 'Previous',
    start: 'Start',
    end: 'End',
    ok: 'OK',
    select: 'Select',
    cancel: 'Cancel',
    close: 'Close',
    queryError: 'Query error',
    autoUpdate: 'Auto update',
    download: 'Download',
    copyUrl: 'Copy URL',
    viewRawData: 'View raw data',
    rawData: 'Raw Data',
    copySpecificUrl: 'Copy URL - fixed time',
    logout: 'Logout',
    infoAndFeedback: 'Info & Feedback',
    copyValue: 'Copy value',
    goToUrl: 'Go to URL',
    openIn: 'Open in',
    segment: 'segment',
    exportToCSV: 'Export to CSV',
    updateTimezone: 'Update Timezone',
    timezone: 'Timezone',
    splitDelimiter: 'by',
    any: 'any',
    noQueryableDataSources: 'There are no queryable data sources configured',
    include: 'Include',
    exclude: 'Exclude',
    intersection: 'Intersection',
    stringSearch: 'String search',
    regex: 'Regex'
};
var EN_US = {
    shortDays: ["S", "M", "T", "W", "T", "F", "S"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weekStart: 0
};
function getLocale() {
    return EN_US;
}
exports.getLocale = getLocale;
