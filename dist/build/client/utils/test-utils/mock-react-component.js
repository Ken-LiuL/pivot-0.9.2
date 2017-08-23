"use strict";
function mockReactComponent(_class) {
    var prototype = _class.prototype;
    var toUndo = [];
    if (prototype.hasOwnProperty('componentDidMount') === true) {
        var oldComponentDidMount_1 = prototype.componentDidMount;
        toUndo.push(function () {
            prototype.componentDidMount = oldComponentDidMount_1;
        });
        prototype.componentDidMount = function () { };
    }
    if (prototype.hasOwnProperty('render') === true) {
        var oldRender_1 = prototype.render;
        toUndo.push(function () {
            prototype.render = oldRender_1;
        });
        prototype.render = function () { return null; };
    }
    _class.restore = function () {
        toUndo.map(function (fn) { return fn(); });
        delete this.restore;
    };
}
exports.mockReactComponent = mockReactComponent;
