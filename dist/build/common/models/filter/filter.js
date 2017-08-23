"use strict";
var immutable_1 = require('immutable');
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var general_1 = require('../../utils/general/general');
var dimension_1 = require('../dimension/dimension');
var filter_clause_1 = require('../filter-clause/filter-clause');
function withholdClause(clauses, clause, allowIndex) {
    return clauses.filter(function (c, i) {
        return i === allowIndex || !c.equals(clause);
    });
}
function swapClause(clauses, clause, other, allowIndex) {
    return clauses.map(function (c, i) {
        return (i === allowIndex || !c.equals(clause)) ? c : other;
    });
}
function dateToFileString(date) {
    return date.toISOString()
        .replace('T', '_')
        .replace('Z', '')
        .replace('.000', '');
}
var check;
var Filter = (function () {
    function Filter(parameters) {
        this.clauses = parameters;
    }
    Filter.isFilter = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Filter);
    };
    Filter.fromClause = function (clause) {
        if (!clause)
            throw new Error('must have clause');
        return new Filter(immutable_1.List([clause]));
    };
    Filter.fromJS = function (parameters) {
        var expression = plywood_1.Expression.fromJSLoose(parameters);
        var clauses = null;
        if (expression.equals(plywood_1.Expression.TRUE)) {
            clauses = [];
        }
        else {
            clauses = (expression.getExpressionPattern('and') || [expression]).map(function (c) { return filter_clause_1.FilterClause.fromExpression(c); });
        }
        return new Filter(immutable_1.List(clauses));
    };
    Filter.prototype.valueOf = function () {
        return this.clauses;
    };
    Filter.prototype.toJS = function () {
        return this.toExpression().toJS();
    };
    Filter.prototype.toJSON = function () {
        return this.toJS();
    };
    Filter.prototype.toString = function () {
        return this.clauses.map(function (clause) { return clause.toString(); }).join(' and ');
    };
    Filter.prototype.equals = function (other) {
        return Filter.isFilter(other) &&
            general_1.immutableListsEqual(this.clauses, other.clauses);
    };
    Filter.prototype.replaceByIndex = function (index, replace) {
        var clauses = this.clauses;
        if (clauses.size === index)
            return this.insertByIndex(index, replace);
        var replacedClause = clauses.get(index);
        clauses = clauses.map(function (c, i) { return i === index ? replace : c; });
        clauses = swapClause(clauses, replace, replacedClause, index);
        return new Filter(clauses);
    };
    Filter.prototype.insertByIndex = function (index, insert) {
        var clauses = this.clauses;
        clauses = clauses.splice(index, 0, insert);
        clauses = withholdClause(clauses, insert, index);
        return new Filter(clauses);
    };
    Filter.prototype.empty = function () {
        return this.clauses.size === 0;
    };
    Filter.prototype.single = function () {
        return this.clauses.size === 1;
    };
    Filter.prototype.length = function () {
        return this.clauses.size;
    };
    Filter.prototype.toExpression = function () {
        var clauses = this.clauses.toArray().map(function (clause) {
            return clause.toExpression();
        });
        switch (clauses.length) {
            case 0:
                return plywood_1.Expression.TRUE;
            case 1:
                return clauses[0];
            default:
                return plywood_1.Expression.and(clauses);
        }
    };
    Filter.prototype.isEmpty = function () {
        return this.clauses.isEmpty();
    };
    Filter.prototype.isRelative = function () {
        return this.clauses.some(function (clause) { return clause.relative; });
    };
    Filter.prototype.getSpecificFilter = function (now, maxTime, timezone) {
        if (!this.isRelative())
            return this;
        return new Filter(this.clauses.map(function (c) { return c.evaluate(now, maxTime, timezone); }));
    };
    Filter.prototype.indexOfClause = function (attribute) {
        return this.clauses.findIndex(function (clause) { return clause.expression.equals(attribute); });
    };
    Filter.prototype.clauseForExpression = function (attribute) {
        return this.clauses.find(function (clause) { return clause.expression.equals(attribute); });
    };
    Filter.prototype.filteredOn = function (attribute) {
        return this.indexOfClause(attribute) !== -1;
    };
    Filter.prototype.filteredOnValue = function (attribute, value) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1)
            return false;
        return clauses.get(index).getLiteralSet().contains(value);
    };
    Filter.prototype.addValue = function (attribute, value) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1) {
            return new Filter(clauses.concat(new filter_clause_1.FilterClause({
                expression: attribute,
                selection: plywood_1.r(plywood_1.Set.fromJS([value]))
            })));
        }
        else {
            var clause = clauses.get(index);
            var newSet = clause.getLiteralSet().add(value);
            return new Filter(clauses.splice(index, 1, clause.changeSelection(plywood_1.r(newSet))));
        }
    };
    Filter.prototype.remove = function (attribute) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1)
            return this;
        return new Filter(clauses.delete(index));
    };
    Filter.prototype.removeValue = function (attribute, value) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1)
            return this;
        var clause = clauses.get(index);
        var newSet = clause.getLiteralSet().remove(value);
        if (newSet.empty()) {
            return new Filter(clauses.delete(index));
        }
        else {
            clauses = clauses.splice(index, 1, clause.changeSelection(plywood_1.r(newSet)));
            return new Filter(clauses);
        }
    };
    Filter.prototype.toggleValue = function (attribute, value) {
        return this.filteredOnValue(attribute, value) ? this.removeValue(attribute, value) : this.addValue(attribute, value);
    };
    Filter.prototype.getSelection = function (attribute) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1)
            return null;
        return clauses.get(index).selection;
    };
    Filter.prototype.setSelection = function (attribute, selection) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        var newClause = new filter_clause_1.FilterClause({
            expression: attribute,
            selection: selection
        });
        if (index === -1) {
            clauses = clauses.push(newClause);
        }
        else {
            clauses = clauses.splice(index, 1, newClause);
        }
        return new Filter(clauses);
    };
    Filter.prototype.getExtent = function (attribute) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1)
            return null;
        return clauses.get(index).getExtent();
    };
    Filter.prototype.getFileString = function (timeAttribute) {
        var nonTimeClauseSize = this.clauses.size;
        var timeRange = this.getExtent(timeAttribute); // ToDo: revisit this
        var nonTimeFilters = (function (nonTimeClauseSize) {
            return nonTimeClauseSize === 0 ? "" : "_filters-" + nonTimeClauseSize;
        });
        if (timeRange) {
            var start = timeRange.start, end = timeRange.end;
            nonTimeClauseSize--;
            return dateToFileString(start) + "_" + dateToFileString(end) + nonTimeFilters(nonTimeClauseSize);
        }
        return nonTimeFilters(nonTimeClauseSize);
    };
    Filter.prototype.getLiteralSet = function (attribute) {
        var clauses = this.clauses;
        var index = this.indexOfClause(attribute);
        if (index === -1)
            return null;
        return clauses.get(index).getLiteralSet();
    };
    Filter.prototype.getClausesForDimension = function (dimension) {
        return this.clauses.filter(function (clause) {
            return clause.expression.equals(dimension.expression);
        });
    };
    Filter.prototype.getModeForDimension = function (dimension) {
        var dimensionClauses = this.getClausesForDimension(dimension);
        if (dimensionClauses.size > 0) {
            var isExcluded = dimensionClauses.every(function (clause) { return clause.exclude; });
            return isExcluded ? 'exclude' : 'include';
        }
        return undefined;
    };
    Filter.prototype.setClause = function (expression) {
        var expressionAttribute = expression.expression;
        var added = false;
        var newOperands = this.clauses.map(function (clause) {
            if (clause.expression.equals(expressionAttribute)) {
                added = true;
                return expression;
            }
            else {
                return clause;
            }
        });
        if (!added) {
            newOperands = newOperands.push(expression);
        }
        return new Filter(newOperands);
    };
    Filter.prototype.applyDelta = function (delta) {
        var newFilter = this;
        var deltaClauses = delta.clauses;
        deltaClauses.forEach(function (deltaClause) {
            newFilter = newFilter.setClause(deltaClause);
        });
        return newFilter;
    };
    Filter.prototype.getSingleClauseSet = function () {
        var clauses = this.clauses;
        if (clauses.size !== 1)
            return null;
        return clauses.get(0).getLiteralSet();
    };
    Filter.prototype.constrainToDimensions = function (dimensions, timeAttribute, oldTimeAttribute) {
        if (oldTimeAttribute === void 0) { oldTimeAttribute = null; }
        var hasChanged = false;
        var clauses = [];
        this.clauses.forEach(function (clause) {
            var clauseExpression = clause.expression;
            if (dimension_1.Dimension.getDimensionByExpression(dimensions, clauseExpression)) {
                clauses.push(clause);
            }
            else {
                hasChanged = true;
                // Special handling for time filter
                if (timeAttribute && oldTimeAttribute && oldTimeAttribute.equals(clauseExpression)) {
                    clauses.push(new filter_clause_1.FilterClause({
                        expression: timeAttribute,
                        selection: clause.selection
                    }));
                }
            }
        });
        return hasChanged ? new Filter(immutable_1.List(clauses)) : this;
    };
    Filter.prototype.getDifferentAttributes = function (other) {
        var diff = [];
        this.clauses.forEach(function (clause) {
            var clauseExpression = clause.expression;
            var otherClause = other.clauseForExpression(clauseExpression);
            if (!clause.equals(otherClause)) {
                diff.push(clauseExpression);
            }
        });
        return diff;
    };
    Filter.prototype.overQuery = function (duration, timezone, timeAttribute) {
        if (!timeAttribute)
            return this;
        return new Filter(this.clauses.map(function (clause) {
            if (clause.expression.equals(timeAttribute)) {
                var timeRange = clause.getExtent();
                var newTimeRange = new plywood_1.TimeRange({
                    start: duration.shift(timeRange.start, timezone, -1),
                    end: duration.shift(timeRange.end, timezone, 1)
                });
                return clause.changeSelection(plywood_1.r(newTimeRange));
            }
            else {
                return clause;
            }
        }));
    };
    Filter.prototype.setExclusionforDimension = function (exclusion, dimension) {
        var clauses = this.clauses.map(function (clause) {
            if (!clause.expression.equals(dimension.expression))
                return clause;
            return clause.changeExclude(exclusion);
        });
        return new Filter(clauses);
    };
    Filter.EXCLUDED = 'exclude';
    Filter.INCLUDED = 'include';
    return Filter;
}());
exports.Filter = Filter;
check = Filter;
Filter.EMPTY = new Filter(immutable_1.List());
