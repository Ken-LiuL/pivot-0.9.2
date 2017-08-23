"use strict";
var plywood_1 = require('plywood');
var chronoshift_1 = require('chronoshift');
var general_1 = require('../../../common/utils/general/general');
var MENU_LENGTH = 5;
function makeCheckpoint(checkPoint, returnValue) {
    return {
        checkPoint: checkPoint,
        returnValue: returnValue
    };
}
function makeNumberBuckets(centerAround, count, coarse) {
    var granularities = [];
    var logTen = Math.log(centerAround) / Math.LN10;
    var digits = general_1.getNumberOfWholeDigits(centerAround);
    while (granularities.length <= count) {
        if (!coarse) {
            var halfStep = general_1.toSignificantDigits(5 * Math.pow(10, logTen - 1), digits);
            granularities.push(granularityFromJS(halfStep));
        }
        if (granularities.length >= count)
            break;
        var wholeStep = general_1.toSignificantDigits(Math.pow(10, logTen), digits);
        granularities.push(granularityFromJS(wholeStep));
        logTen++;
    }
    return granularities;
}
function makeNumberBucketsSimple() {
    var granularities = [];
    for (var i = 3; i > -2; i--) {
        granularities.push(granularityFromJS(Math.pow(10, i)));
    }
    return granularities;
}
function days(count) {
    return count * chronoshift_1.day.canonicalLength;
}
function hours(count) {
    return count * chronoshift_1.hour.canonicalLength;
}
function minutes(count) {
    return count * chronoshift_1.minute.canonicalLength;
}
var TimeHelper = (function () {
    function TimeHelper() {
    }
    TimeHelper.dimensionKind = 'time';
    TimeHelper.minGranularity = granularityFromJS('PT1M');
    TimeHelper.defaultGranularity = granularityFromJS('P1D');
    TimeHelper.supportedGranularities = function (bucketedBy) {
        return [
            'PT1S', 'PT1M', 'PT5M', 'PT15M',
            'PT1H', 'PT6H', 'PT8H', 'PT12H',
            'P1D', 'P1W', 'P1M', 'P3M', 'P6M',
            'P1Y', 'P2Y'
        ].map(granularityFromJS);
    };
    TimeHelper.checkers = [
        makeCheckpoint(days(95), 'P1W'),
        makeCheckpoint(days(8), 'P1D'),
        makeCheckpoint(hours(8), 'PT1H'),
        makeCheckpoint(hours(3), 'PT5M')];
    TimeHelper.coarseCheckers = [
        makeCheckpoint(days(95), 'P1M'),
        makeCheckpoint(days(20), 'P1W'),
        makeCheckpoint(days(6), 'P1D'),
        makeCheckpoint(days(2), 'PT12H'),
        makeCheckpoint(hours(23), 'PT6H'),
        makeCheckpoint(hours(3), 'PT1H'),
        makeCheckpoint(minutes(30), 'PT5M')
    ];
    TimeHelper.defaultGranularities = TimeHelper.checkers.map(function (c) { return granularityFromJS(c.returnValue); }).concat(TimeHelper.minGranularity).reverse();
    TimeHelper.coarseGranularities = TimeHelper.coarseCheckers.map(function (c) { return granularityFromJS(c.returnValue); }).concat(TimeHelper.minGranularity).reverse();
    return TimeHelper;
}());
exports.TimeHelper = TimeHelper;
var NumberHelper = (function () {
    function NumberHelper() {
    }
    NumberHelper.dimensionKind = 'number';
    NumberHelper.minGranularity = granularityFromJS(1);
    NumberHelper.defaultGranularity = granularityFromJS(10);
    NumberHelper.checkers = [
        makeCheckpoint(5000, 1000),
        makeCheckpoint(500, 100),
        makeCheckpoint(100, 10),
        makeCheckpoint(1, 1),
        makeCheckpoint(0.1, 0.1)
    ];
    NumberHelper.defaultGranularities = NumberHelper.checkers.map(function (c) { return granularityFromJS(c.returnValue); }).reverse();
    NumberHelper.coarseGranularities = null;
    NumberHelper.coarseCheckers = [
        makeCheckpoint(500000, 50000),
        makeCheckpoint(50000, 10000),
        makeCheckpoint(5000, 5000),
        makeCheckpoint(1000, 1000),
        makeCheckpoint(100, 100),
        makeCheckpoint(10, 10),
        makeCheckpoint(1, 1),
        makeCheckpoint(0.1, 0.1)
    ];
    NumberHelper.supportedGranularities = function (bucketedBy) {
        return makeNumberBuckets(getBucketSize(bucketedBy), 10);
    };
    return NumberHelper;
}());
exports.NumberHelper = NumberHelper;
function getHelperForKind(kind) {
    if (kind === 'time')
        return TimeHelper;
    return NumberHelper;
}
function getHelperForRange(input) {
    if (input instanceof plywood_1.TimeRange)
        return TimeHelper;
    return NumberHelper;
}
function getBucketSize(input) {
    if (input instanceof plywood_1.TimeBucketAction)
        return input.duration.getCanonicalLength();
    if (input instanceof plywood_1.NumberBucketAction)
        return input.size;
    throw new Error("unrecognized granularity: " + input + " must be of type TimeBucketAction or NumberBucketAction");
}
function getBucketUnit(input) {
    if (input instanceof plywood_1.TimeBucketAction)
        return input.duration;
    if (input instanceof plywood_1.NumberBucketAction)
        return input.size;
    throw new Error("unrecognized granularity: " + input + " must be of type TimeBucketAction or NumberBucketAction");
}
function bucketUnitToGranularity(input) {
    if (input instanceof plywood_1.Duration) {
        return new plywood_1.TimeBucketAction({ duration: input });
    }
    else if (!isNaN(input)) {
        return new plywood_1.NumberBucketAction({ size: input, offset: 0 });
    }
    throw new Error("unrecognized bucket unit: " + input + " must be of type number or Duration");
}
function startValue(input) {
    return input instanceof plywood_1.TimeRange ? input.start.valueOf() : input.start;
}
function endValue(input) {
    return input instanceof plywood_1.TimeRange ? input.end.valueOf() : input.end;
}
function findBestMatch(array, target) {
    var exactMatch = general_1.findExactIndex(array, target, getBucketSize);
    if (exactMatch !== -1) {
        return array[exactMatch];
    }
    var minBiggerIdx = general_1.findFirstBiggerIndex(array, target, getBucketSize);
    if (minBiggerIdx !== -1) {
        return array[minBiggerIdx];
    }
    return array[general_1.findMaxValueIndex(array, getBucketSize)];
}
function generateGranularitySet(allGranularities, bucketedBy) {
    var start = general_1.findFirstBiggerIndex(allGranularities, bucketedBy, getBucketSize);
    var returnGranularities = allGranularities.slice(start, start + MENU_LENGTH);
    // makes sure the bucket is part of the list
    if (general_1.findExactIndex(returnGranularities, bucketedBy, getBucketSize) === -1) {
        returnGranularities = [bucketedBy].concat(returnGranularities.slice(0, returnGranularities.length - 1));
    }
    return returnGranularities;
}
function granularityFromJS(input) {
    if (typeof input === 'number')
        return plywood_1.NumberBucketAction.fromJS({ size: input });
    if (typeof input === 'string')
        return plywood_1.TimeBucketAction.fromJS({ duration: input });
    if (typeof input === "object") {
        if (!general_1.hasOwnProperty(input, 'action')) {
            throw new Error("could not recognize object as action");
        }
        return plywood_1.Action.fromJS(input);
    }
    throw new Error("input should be of type number, string, or action");
}
exports.granularityFromJS = granularityFromJS;
function granularityToString(input) {
    if (input instanceof plywood_1.TimeBucketAction) {
        return input.duration.toString();
    }
    else if (input instanceof plywood_1.NumberBucketAction) {
        return input.size.toString();
    }
    throw new Error("unrecognized granularity: " + input + " must be of type TimeBucketAction or NumberBucketAction");
}
exports.granularityToString = granularityToString;
function granularityEquals(g1, g2) {
    if (!Boolean(g1) === Boolean(g2))
        return false;
    if (g1 === g2)
        return true;
    return g1.equals(g2);
}
exports.granularityEquals = granularityEquals;
function granularityToJS(input) {
    var js = input.toJS();
    if (js.action === 'timeBucket') {
        if (Object.keys(js).length === 2)
            return js.duration;
    }
    if (js.action === 'numberBucket') {
        if (Object.keys(js).length === 2)
            return js.size;
    }
    return js;
}
exports.granularityToJS = granularityToJS;
function updateBucketSize(existing, newInput) {
    if (newInput instanceof plywood_1.TimeBucketAction) {
        return new plywood_1.TimeBucketAction({
            duration: newInput.duration,
            timezone: existing.timezone
        });
    }
    else if (newInput instanceof plywood_1.NumberBucketAction) {
        var value = { size: newInput.size };
        if (existing.offset)
            value.offset = existing.offset;
        return new plywood_1.NumberBucketAction(value);
    }
    throw new Error("unrecognized granularity: " + newInput + " must be of type TimeBucket or NumberBucket");
}
exports.updateBucketSize = updateBucketSize;
function getGranularities(kind, bucketedBy, coarse) {
    var helper = getHelperForKind(kind);
    var coarseGranularities = helper.coarseGranularities;
    if (!bucketedBy)
        return coarse && coarseGranularities ? coarseGranularities : helper.defaultGranularities;
    // make list that makes most sense with bucket
    var allGranularities = helper.supportedGranularities(bucketedBy);
    return generateGranularitySet(allGranularities, bucketedBy);
}
exports.getGranularities = getGranularities;
function getDefaultGranularityForKind(kind, bucketedBy, customGranularities) {
    if (bucketedBy)
        return bucketedBy;
    if (customGranularities)
        return customGranularities[2];
    return getHelperForKind(kind).defaultGranularity;
}
exports.getDefaultGranularityForKind = getDefaultGranularityForKind;
function getBestGranularityForRange(inputRange, bigChecker, bucketedBy, customGranularities) {
    return bucketUnitToGranularity(getBestBucketUnitForRange(inputRange, bigChecker, bucketedBy, customGranularities));
}
exports.getBestGranularityForRange = getBestGranularityForRange;
function getBestBucketUnitForRange(inputRange, bigChecker, bucketedBy, customGranularities) {
    var rangeLength = Math.abs(endValue(inputRange) - startValue(inputRange));
    var helper = getHelperForRange(inputRange);
    var bucketLength = bucketedBy ? getBucketSize(bucketedBy) : 0;
    var checkPoints = bigChecker && helper.coarseCheckers ? helper.coarseCheckers : helper.checkers;
    for (var i = 0; i < checkPoints.length; i++) {
        var checkPoint = checkPoints[i].checkPoint;
        var returnVal = granularityFromJS(checkPoints[i].returnValue);
        if (rangeLength > checkPoint || bucketLength > checkPoint) {
            if (bucketedBy) {
                var granArray = customGranularities || getGranularities(helper.dimensionKind, bucketedBy);
                var closest = general_1.findBiggerClosestToIdeal(granArray, bucketedBy, returnVal, getBucketSize);
                // this could happen if bucketedBy were very big or if custom granularities are smaller than maker action
                if (closest === null)
                    return getBucketUnit(helper.defaultGranularity);
                return getBucketUnit(closest);
            }
            else {
                if (!customGranularities)
                    return getBucketUnit(returnVal);
                return getBucketUnit(findBestMatch(customGranularities, returnVal));
            }
        }
    }
    var minBucket = customGranularities ? customGranularities[general_1.findMinValueIndex(customGranularities, getBucketSize)] : helper.minGranularity;
    var granularity = bucketLength > getBucketSize(minBucket) ? bucketedBy : minBucket;
    return getBucketUnit(granularity);
}
exports.getBestBucketUnitForRange = getBestBucketUnitForRange;
function getLineChartTicks(range, timezone) {
    if (range instanceof plywood_1.TimeRange) {
        var _a = range, start = _a.start, end = _a.end;
        var tickDuration = getBestBucketUnitForRange(range, true);
        return tickDuration.materialize(start, end, timezone);
    }
    else {
        var _b = range, start = _b.start, end = _b.end;
        var unit = getBestBucketUnitForRange(range, true);
        var values = [];
        var iter = Math.round(start * unit) / unit;
        while (iter <= end) {
            values.push(iter);
            iter += unit;
        }
        return values;
    }
}
exports.getLineChartTicks = getLineChartTicks;
