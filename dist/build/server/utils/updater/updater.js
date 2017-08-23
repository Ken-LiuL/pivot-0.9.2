"use strict";
var immutable_class_1 = require('immutable-class');
var general_1 = require('../../../common/utils/general/general');
function getName(thing) {
    return thing.name;
}
function noop() { }
function updater(oldThings, newThings, updatedOptions) {
    var key = updatedOptions.key || getName;
    var equals = updatedOptions.equals || immutable_class_1.immutableEqual;
    var onEnter = updatedOptions.onEnter || noop;
    var onUpdate = updatedOptions.onUpdate || noop;
    var onExit = updatedOptions.onExit || noop;
    var initialByKey = {};
    for (var i = 0; i < oldThings.length; i++) {
        var initialThing = oldThings[i];
        var initialThingKey = key(initialThing);
        if (initialByKey[initialThingKey])
            throw new Error("duplicate key '" + initialThingKey + "'");
        initialByKey[initialThingKey] = initialThing;
    }
    for (var j = 0; j < newThings.length; j++) {
        var newThing = newThings[j];
        var newThingKey = key(newThing);
        var oldThing = initialByKey[newThingKey];
        if (oldThing) {
            if (!equals(newThing, oldThing)) {
                onUpdate(newThing, oldThing);
            }
            delete initialByKey[newThingKey];
        }
        else {
            onEnter(newThing);
        }
    }
    for (var k in initialByKey) {
        if (!general_1.hasOwnProperty(initialByKey, k))
            continue;
        onExit(initialByKey[k]);
    }
}
exports.updater = updater;
