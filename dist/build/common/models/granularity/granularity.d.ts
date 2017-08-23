import { TimeBucketAction, NumberBucketAction, ActionJS, Duration, PlywoodRange } from 'plywood';
import { Timezone } from 'chronoshift';
export declare type Granularity = TimeBucketAction | NumberBucketAction;
export declare type GranularityJS = string | number | ActionJS;
export declare type BucketUnit = Duration | number;
export declare type ContinuousDimensionKind = 'time' | 'number';
export interface Checker {
    checkPoint: number;
    returnValue: GranularityJS;
}
export interface Helper {
    dimensionKind: ContinuousDimensionKind;
    minGranularity: Granularity;
    defaultGranularity: Granularity;
    defaultGranularities: Granularity[];
    supportedGranularities: Granularity[];
    checkers: Checker[];
    coarseCheckers?: Checker[];
    coarseGranularities?: Granularity[];
}
export declare class TimeHelper {
    static dimensionKind: ContinuousDimensionKind;
    static minGranularity: TimeBucketAction | NumberBucketAction;
    static defaultGranularity: TimeBucketAction | NumberBucketAction;
    static supportedGranularities: (bucketedBy: TimeBucketAction | NumberBucketAction) => (TimeBucketAction | NumberBucketAction)[];
    static checkers: Checker[];
    static coarseCheckers: Checker[];
    static defaultGranularities: (TimeBucketAction | NumberBucketAction)[];
    static coarseGranularities: (TimeBucketAction | NumberBucketAction)[];
}
export declare class NumberHelper {
    static dimensionKind: ContinuousDimensionKind;
    static minGranularity: TimeBucketAction | NumberBucketAction;
    static defaultGranularity: TimeBucketAction | NumberBucketAction;
    static checkers: Checker[];
    static defaultGranularities: (TimeBucketAction | NumberBucketAction)[];
    static coarseGranularities: Granularity[];
    static coarseCheckers: Checker[];
    static supportedGranularities: (bucketedBy: TimeBucketAction | NumberBucketAction) => (TimeBucketAction | NumberBucketAction)[];
}
export declare function granularityFromJS(input: GranularityJS): Granularity;
export declare function granularityToString(input: Granularity): string;
export declare function granularityEquals(g1: Granularity, g2: Granularity): boolean;
export declare function granularityToJS(input: Granularity): GranularityJS;
export declare function updateBucketSize(existing: Granularity, newInput: Granularity): Granularity;
export declare function getGranularities(kind: ContinuousDimensionKind, bucketedBy?: Granularity, coarse?: boolean): Granularity[];
export declare function getDefaultGranularityForKind(kind: ContinuousDimensionKind, bucketedBy?: Granularity, customGranularities?: Granularity[]): Granularity;
export declare function getBestGranularityForRange(inputRange: PlywoodRange, bigChecker: boolean, bucketedBy?: Granularity, customGranularities?: Granularity[]): Granularity;
export declare function getBestBucketUnitForRange(inputRange: PlywoodRange, bigChecker: boolean, bucketedBy?: Granularity, customGranularities?: Granularity[]): BucketUnit;
export declare function getLineChartTicks(range: PlywoodRange, timezone: Timezone): (Date | number)[];
