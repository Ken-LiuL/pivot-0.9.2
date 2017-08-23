"use strict";
var immutable_class_1 = require('immutable-class');
var chronoshift_1 = require('chronoshift');
var plywood_1 = require('plywood');
function isLiteral(ex) {
    if (ex instanceof plywood_1.LiteralExpression)
        return plywood_1.TimeRange.isTimeRange(ex.value) || plywood_1.Set.isSet(ex.value) || plywood_1.NumberRange.isNumberRange(ex.value);
    return false;
}
function isRelative(ex) {
    if (ex instanceof plywood_1.ChainExpression) {
        if (ex.type !== 'TIME_RANGE')
            return false;
        var expression = ex.expression;
        if (expression instanceof plywood_1.RefExpression) {
            return expression.name === FilterClause.NOW_REF_NAME || expression.name === FilterClause.MAX_TIME_REF_NAME;
        }
    }
    return false;
}
var check;
var FilterClause = (function () {
    function FilterClause(parameters) {
        this.expression = parameters.expression;
        var selection = parameters.selection;
        if (isRelative(selection)) {
            this.relative = true;
        }
        else if (isLiteral(selection)) {
            this.relative = false;
        }
        else {
            throw new Error("invalid expression " + selection.toString());
        }
        this.selection = selection;
        this.exclude = parameters.exclude || false;
    }
    FilterClause.isFilterClause = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, FilterClause);
    };
    FilterClause.evaluate = function (selection, now, maxTime, timezone) {
        if (!selection)
            return null;
        var maxTimeMinuteTop = chronoshift_1.minute.shift(chronoshift_1.minute.floor(maxTime || now, timezone), timezone, 1);
        var datum = {};
        datum[FilterClause.NOW_REF_NAME] = now;
        datum[FilterClause.MAX_TIME_REF_NAME] = maxTimeMinuteTop;
        return selection.defineEnvironment({ timezone: timezone }).getFn()(datum, {});
    };
    FilterClause.fromExpression = function (ex) {
        var exclude = false;
        if (ex.lastAction() instanceof plywood_1.NotAction) {
            ex = ex.popAction();
            exclude = true;
        }
        var lastAction = ex.lastAction();
        var dimExpression = ex.popAction();
        if (lastAction instanceof plywood_1.InAction || lastAction instanceof plywood_1.OverlapAction) {
            var selection = lastAction.expression;
            return new FilterClause({
                expression: dimExpression,
                selection: selection,
                exclude: exclude
            });
        }
        throw new Error("invalid expression " + ex.toString());
    };
    FilterClause.fromJS = function (parameters) {
        var value = {
            expression: plywood_1.Expression.fromJS(parameters.expression),
            selection: plywood_1.Expression.fromJS(parameters.selection),
            exclude: Boolean(parameters.exclude)
        };
        return new FilterClause(value);
    };
    FilterClause.prototype.valueOf = function () {
        return {
            expression: this.expression,
            selection: this.selection,
            exclude: this.exclude
        };
    };
    FilterClause.prototype.toJS = function () {
        var js = {
            expression: this.expression.toJS(),
            selection: this.selection.toJS()
        };
        if (this.exclude)
            js.exclude = true;
        return js;
    };
    FilterClause.prototype.toJSON = function () {
        return this.toJS();
    };
    FilterClause.prototype.toString = function () {
        return "[FilterClause: " + this.expression.toString() + "]";
    };
    FilterClause.prototype.equals = function (other) {
        return FilterClause.isFilterClause(other) &&
            this.expression.equals(other.expression) &&
            this.selection.equals(other.selection) &&
            this.exclude === other.exclude;
    };
    FilterClause.prototype.toExpression = function () {
        var _a = this, expression = _a.expression, selection = _a.selection;
        var ex = null;
        var selectionType = selection.type;
        if (selectionType === 'TIME_RANGE' || selectionType === 'SET/TIME_RANGE' || selectionType === 'NUMBER_RANGE' || selectionType === 'SET/NUMBER_RANGE') {
            ex = expression.in(selection);
        }
        else {
            ex = expression.overlap(selection);
        }
        if (this.exclude)
            ex = ex.not();
        return ex;
    };
    FilterClause.prototype.getLiteralSet = function () {
        if (this.relative)
            return null;
        var v = this.selection.getLiteralValue();
        return (plywood_1.TimeRange.isTimeRange(v) || plywood_1.NumberRange.isNumberRange(v)) ? plywood_1.Set.fromJS([v]) : v;
    };
    FilterClause.prototype.getExtent = function () {
        var mySet = this.getLiteralSet();
        return mySet ? mySet.extent() : null;
    };
    FilterClause.prototype.changeSelection = function (selection) {
        var value = this.valueOf();
        value.selection = selection;
        return new FilterClause(value);
    };
    FilterClause.prototype.changeExclude = function (exclude) {
        var value = this.valueOf();
        value.exclude = exclude;
        return new FilterClause(value);
    };
    FilterClause.prototype.evaluate = function (now, maxTime, timezone) {
        if (!this.relative)
            return this;
        return this.changeSelection(plywood_1.r(FilterClause.evaluate(this.selection, now, maxTime, timezone)));
    };
    FilterClause.NOW_REF_NAME = 'n';
    FilterClause.MAX_TIME_REF_NAME = 'm';
    return FilterClause;
}());
exports.FilterClause = FilterClause;
check = FilterClause;
