"use strict";
exports.CONSOLE_LOGGER = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
};
function noop() { }
exports.NULL_LOGGER = {
    log: noop,
    warn: noop,
    error: noop
};
