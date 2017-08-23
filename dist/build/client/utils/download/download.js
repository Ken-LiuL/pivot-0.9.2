"use strict";
var filesaver = require('browser-filesaver');
function getMIMEType(fileType) {
    switch (fileType) {
        case 'csv':
            return 'text/csv';
        case 'tsv':
            return 'text/tsv';
        default:
            return 'application/json';
    }
}
exports.getMIMEType = getMIMEType;
function download(dataset, fileName, fileFormat) {
    var type = getMIMEType(fileFormat) + ";charset=utf-8";
    var blob = new Blob([datasetToFileString(dataset, fileFormat)], { type: type });
    if (!fileName)
        fileName = new Date() + "-data";
    fileName += "." + fileFormat;
    filesaver.saveAs(blob, fileName, true); // true == disable auto BOM
}
exports.download = download;
function datasetToFileString(dataset, fileFormat) {
    if (fileFormat === 'csv') {
        return dataset.toCSV();
    }
    else if (fileFormat === 'tsv') {
        return dataset.toTSV();
    }
    else {
        return JSON.stringify(dataset.toJS(), null, 2);
    }
}
exports.datasetToFileString = datasetToFileString;
function makeFileName() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var nameComponents = [];
    args.forEach(function (arg) {
        if (arg)
            nameComponents.push(arg.toLowerCase());
    });
    var nameString = nameComponents.join("_");
    return nameString.length < 200 ? nameString : nameString.substr(0, 200);
}
exports.makeFileName = makeFileName;
