"use strict";
var DragManager = (function () {
    function DragManager() {
    }
    DragManager.init = function () {
        document.addEventListener("dragend", function () {
            DragManager.dragOrigin = null;
            DragManager.dragDimension = null;
            DragManager.dragSplit = null;
        }, false);
    };
    DragManager.getDragOrigin = function () {
        return DragManager.dragOrigin;
    };
    DragManager.setDragDimension = function (dimension, origin) {
        DragManager.dragDimension = dimension;
        DragManager.dragOrigin = origin;
    };
    DragManager.getDragDimension = function () {
        return DragManager.dragDimension;
    };
    DragManager.setDragSplit = function (split, origin) {
        DragManager.dragSplit = split;
        DragManager.dragOrigin = origin;
    };
    DragManager.getDragSplit = function () {
        return DragManager.dragSplit;
    };
    DragManager.dragOrigin = null;
    DragManager.dragDimension = null;
    DragManager.dragSplit = null;
    return DragManager;
}());
exports.DragManager = DragManager;
