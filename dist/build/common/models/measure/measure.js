"use strict";
var immutable_class_1 = require('immutable-class');
var numeral = require('numeral');
var plywood_1 = require('plywood');
var general_1 = require('../../utils/general/general');
function formatFnFactory(format) {
    return function (n) {
        if (isNaN(n) || !isFinite(n))
            return '-';
        return numeral(n).format(format);
    };
}
var check;
var Measure = (function () {
    function Measure(parameters) {
        var name = parameters.name;
        general_1.verifyUrlSafeName(name);
        this.name = name;
        this.title = parameters.title || general_1.makeTitle(name);
        var expression = parameters.expression;
        if (!expression)
            throw new Error('measure must have expression');
        this.expression = expression;
        var format = parameters.format || Measure.DEFAULT_FORMAT;
        if (format[0] === '(')
            throw new Error('can not have format that uses ( )');
        this.format = format;
        this.formatFn = formatFnFactory(format);
    }
    Measure.isMeasure = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Measure);
    };
    Measure.getMeasure = function (measures, measureName) {
        if (!measureName)
            return null;
        measureName = measureName.toLowerCase(); // Case insensitive
        return measures.find(function (measure) { return measure.name.toLowerCase() === measureName; });
    };
    /**
     * Look for all instances of aggregateAction($blah) and return the blahs
     * @param ex
     * @returns {string[]}
     */
    Measure.getAggregateReferences = function (ex) {
        var references = [];
        ex.forEach(function (ex) {
            if (ex instanceof plywood_1.ChainExpression) {
                var actions = ex.actions;
                for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                    var action = actions_1[_i];
                    if (action.isAggregate()) {
                        references = references.concat(action.getFreeReferences());
                    }
                }
            }
        });
        return plywood_1.helper.deduplicateSort(references);
    };
    /**
     * Look for all instances of countDistinct($blah) and return the blahs
     * @param ex
     * @returns {string[]}
     */
    Measure.getCountDistinctReferences = function (ex) {
        var references = [];
        ex.forEach(function (ex) {
            if (ex instanceof plywood_1.ChainExpression) {
                var actions = ex.actions;
                for (var _i = 0, actions_2 = actions; _i < actions_2.length; _i++) {
                    var action = actions_2[_i];
                    if (action.action === 'countDistinct') {
                        references = references.concat(action.getFreeReferences());
                    }
                }
            }
        });
        return plywood_1.helper.deduplicateSort(references);
    };
    Measure.measuresFromAttributeInfo = function (attribute) {
        var name = attribute.name, special = attribute.special;
        var $main = plywood_1.$('main');
        var ref = plywood_1.$(name);
        if (special) {
            if (special === 'unique' || special === 'theta') {
                return [
                    new Measure({
                        name: general_1.makeUrlSafeName(name),
                        expression: $main.countDistinct(ref)
                    })
                ];
            }
            else if (special === 'histogram') {
                return [
                    new Measure({
                        name: general_1.makeUrlSafeName(name + '_p95'),
                        expression: $main.quantile(ref, 0.95)
                    }),
                    new Measure({
                        name: general_1.makeUrlSafeName(name + '_p99'),
                        expression: $main.quantile(ref, 0.99)
                    })
                ];
            }
        }
        var expression = $main.sum(ref);
        var makerAction = attribute.makerAction;
        if (makerAction) {
            switch (makerAction.action) {
                case 'min':
                    expression = $main.min(ref);
                    break;
                case 'max':
                    expression = $main.max(ref);
                    break;
            }
        }
        return [new Measure({
                name: general_1.makeUrlSafeName(name),
                expression: expression
            })];
    };
    Measure.fromJS = function (parameters) {
        var name = parameters.name;
        return new Measure({
            name: name,
            title: parameters.title,
            expression: parameters.expression ? plywood_1.Expression.fromJSLoose(parameters.expression) : plywood_1.$('main').sum(plywood_1.$(name)),
            format: parameters.format
        });
    };
    Measure.prototype.valueOf = function () {
        return {
            name: this.name,
            title: this.title,
            expression: this.expression,
            format: this.format
        };
    };
    Measure.prototype.toJS = function () {
        var js = {
            name: this.name,
            title: this.title,
            expression: this.expression.toJS()
        };
        if (this.format !== Measure.DEFAULT_FORMAT)
            js.format = this.format;
        return js;
    };
    Measure.prototype.toJSON = function () {
        return this.toJS();
    };
    Measure.prototype.toString = function () {
        return "[Measure: " + this.name + "]";
    };
    Measure.prototype.equals = function (other) {
        return Measure.isMeasure(other) &&
            this.name === other.name &&
            this.title === other.title &&
            this.expression.equals(other.expression) &&
            this.format === other.format;
    };
    Measure.prototype.toApplyAction = function () {
        var _a = this, name = _a.name, expression = _a.expression;
        return new plywood_1.ApplyAction({
            name: name,
            expression: expression
        });
    };
    Measure.prototype.formatDatum = function (datum) {
        return this.formatFn(datum[this.name]);
    };
    Measure.prototype.changeTitle = function (title) {
        var value = this.valueOf();
        value.title = title;
        return new Measure(value);
    };
    Measure.DEFAULT_FORMAT = '0,0.0 a';
    Measure.INTEGER_FORMAT = '0,0 a';
    return Measure;
}());
exports.Measure = Measure;
check = Measure;
