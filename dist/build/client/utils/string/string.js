"use strict";
function firstUp(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : undefined;
}
exports.firstUp = firstUp;
