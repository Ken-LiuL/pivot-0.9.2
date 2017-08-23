import { List } from 'immutable';
import { Instance } from 'immutable-class';
import { Expression, ExpressionJS, Action, ActionJS, SortAction, LimitAction } from 'plywood';
import { Dimension } from '../dimension/dimension';
export interface SplitCombineValue {
    expression: Expression;
    bucketAction: Action;
    sortAction: SortAction;
    limitAction: LimitAction;
}
export declare type SplitCombineJS = string | SplitCombineJSFull;
export interface SplitCombineJSFull {
    expression: ExpressionJS;
    bucketAction?: ActionJS;
    sortAction?: ActionJS;
    limitAction?: ActionJS;
}
export interface SplitCombineContext {
    dimensions: List<Dimension>;
}
export declare class SplitCombine implements Instance<SplitCombineValue, SplitCombineJS> {
    static isSplitCombine(candidate: any): candidate is SplitCombine;
    static fromExpression(expression: Expression): SplitCombine;
    static fromJS(parameters: SplitCombineJS, context?: SplitCombineContext): SplitCombine;
    expression: Expression;
    bucketAction: Action;
    sortAction: SortAction;
    limitAction: LimitAction;
    constructor(parameters: SplitCombineValue);
    valueOf(): SplitCombineValue;
    toJS(): SplitCombineJS;
    toJSON(): SplitCombineJS;
    toString(): string;
    equals(other: SplitCombine): boolean;
    equalsByExpression(other: SplitCombine): boolean;
    toSplitExpression(): Expression;
    toKey(): string;
    changeBucketAction(bucketAction: Action): SplitCombine;
    changeSortAction(sortAction: SortAction): SplitCombine;
    changeLimitAction(limitAction: LimitAction): SplitCombine;
    changeLimit(limit: number): SplitCombine;
    timezoneDependant(): boolean;
    getDimension(dimensions: List<Dimension>): Dimension;
    getTitle(dimensions: List<Dimension>): string;
    getBucketTitle(): string;
}
