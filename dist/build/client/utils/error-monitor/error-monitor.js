"use strict";
function addErrorMonitor() {
    var originalOnError = window.onerror;
    window.onerror = function (message, file, line, column, errorObject) {
        column = column || (window.event && window.event.errorCharacter);
        var stack = errorObject ? errorObject.stack : null;
        var err = {
            message: message,
            file: file,
            line: line,
            column: column,
            stack: stack
        };
        if (typeof console !== "undefined") {
            console.log('An error has occurred. Please include the below information in the issue:');
            console.log(JSON.stringify(err));
        }
        window.onerror = originalOnError; // only trigger once
        // the error can still be triggered as usual, we just wanted to know what's happening on the client side
        return false;
    };
}
exports.addErrorMonitor = addErrorMonitor;
