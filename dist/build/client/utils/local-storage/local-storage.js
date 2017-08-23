"use strict";
function get(key) {
    try {
        return JSON.parse(localStorage[key]);
    }
    catch (e) {
        return undefined;
    }
}
exports.get = get;
function set(key, value) {
    try {
        localStorage[key] = JSON.stringify(value);
    }
    catch (e) { }
}
exports.set = set;
