"use strict";
var d3 = require('d3');
var general_1 = require('../../../common/utils/general/general');
var DRAG_GHOST_OFFSET_X = -12;
var DRAG_GHOST_OFFSET_Y = -12;
function convertDOMStringListToArray(list) {
    var length = list.length;
    var array = [];
    for (var i = 0; i < length; i++) {
        array.push(list.item(i));
    }
    return array;
}
function isInside(child, parent) {
    var altParent;
    while (child) {
        if (child === parent)
            return true;
        var dataset = child.dataset;
        if (dataset && dataset['parent'] && (altParent = document.getElementById(dataset['parent']))) {
            child = altParent;
        }
        else {
            child = child.parentElement;
        }
    }
    return false;
}
exports.isInside = isInside;
function findParentWithClass(child, className) {
    while (child) {
        if (child.classList.contains(className))
            return child;
        child = child.parentNode;
    }
    return null;
}
exports.findParentWithClass = findParentWithClass;
function setDragGhost(dataTransfer, text) {
    // Thanks to http://www.kryogenix.org/code/browser/custom-drag-image.html
    var dragGhost = d3.select(document.body).append('div')
        .attr('class', 'drag-ghost')
        .text(text);
    // remove <any> when DataTransfer interface in lib.d.ts includes setDragImage
    dataTransfer.setDragImage(dragGhost.node(), DRAG_GHOST_OFFSET_X, DRAG_GHOST_OFFSET_Y);
    // Remove the host after a ms because it is no longer needed
    setTimeout(function () {
        dragGhost.remove();
    }, 1);
}
exports.setDragGhost = setDragGhost;
function enterKey(e) {
    return e.which === 13; // 13 is the code for enter
}
exports.enterKey = enterKey;
function escapeKey(e) {
    return e.which === 27; // 27 is the code for escape
}
exports.escapeKey = escapeKey;
var lastID = 0;
function uniqueId(prefix) {
    lastID++;
    return prefix + lastID;
}
exports.uniqueId = uniqueId;
function transformStyle(x, y) {
    var xStr = String(x);
    var yStr = String(y);
    if (xStr !== '0')
        xStr += 'px';
    if (yStr !== '0')
        yStr += 'px';
    var transform = "translate(" + xStr + "," + yStr + ")";
    return {
        transform: transform,
        WebkitTransform: transform,
        MsTransform: transform
    };
}
exports.transformStyle = transformStyle;
function getXFromEvent(e) {
    return e.clientX || e.pageX;
}
exports.getXFromEvent = getXFromEvent;
function getYFromEvent(e) {
    return e.clientY || e.pageY;
}
exports.getYFromEvent = getYFromEvent;
function roundToPx(n) {
    return Math.round(n);
}
exports.roundToPx = roundToPx;
function roundToHalfPx(n) {
    return Math.round(n - 0.5) + 0.5;
}
exports.roundToHalfPx = roundToHalfPx;
function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
}
exports.clamp = clamp;
function classNames() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var classes = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (!arg)
            continue;
        var argType = typeof arg;
        if (argType === 'string') {
            classes.push(arg);
        }
        else if (argType === 'object') {
            for (var key in arg) {
                if (general_1.hasOwnProperty(arg, key) && arg[key])
                    classes.push(key);
            }
        }
    }
    return classes.join(' ');
}
exports.classNames = classNames;
