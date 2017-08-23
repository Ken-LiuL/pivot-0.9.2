"use strict";
function getStack() {
    var ErrorConstructor = Error;
    var origPrepareStackTrace = ErrorConstructor.prepareStackTrace;
    ErrorConstructor.prepareStackTrace = function (_, stack) { return stack; };
    var err = new Error();
    var stack = err['stack'];
    ErrorConstructor.prepareStackTrace = origPrepareStackTrace;
    stack.shift(); // getStack --> Error
    return stack;
}
function getCallerFile() {
    var stack = getStack();
    stack.shift(); // getCaller --> getStack
    stack.shift(); // caller of getCaller --> getCaller
    return stack[0].getFileName();
}
exports.getCallerFile = getCallerFile;
