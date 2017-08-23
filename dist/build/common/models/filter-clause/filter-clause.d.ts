import { Instance } from 'immutable-class';
import { Timezone } from 'chronoshift';
import { Expression, ExpressionJS, Set, ChainExpression, Range, TimeRange } from 'plywood';
export interface FilterClauseValue {
    expression: Expression;
    selection?: Expression;
    exclude?: boolean;
}
export interface FilterClauseJS {
    expression: ExpressionJS;
    selection?: ExpressionJS;
    exclude?: boolean;
}
export declare class FilterClause implements Instance<FilterClauseValue, FilterClauseJS> {
    static isFilterClause(candidate: any): candidate is FilterClause;
    static NOW_REF_NAME: string;
    static MAX_TIME_REF_NAME: string;
    static evaluate(selection: Expression, now: Date, maxTime: Date, timezone: Timezone): TimeRange;
    static fromExpression(ex: Expression): FilterClause;
    static fromJS(parameters: FilterClauseJS): FilterClause;
    expression: Expression;
    selection: Expression;
    exclude: boolean;
    relative: boolean;
    constructor(parameters: FilterClauseValue);
    valueOf(): FilterClauseValue;
    toJS(): FilterClauseJS;
    toJSON(): FilterClauseJS;
    toString(): string;
    equals(other: FilterClause): boolean;
    toExpression(): ChainExpression;
    getLiteralSet(): Set;
    getExtent(): Range<any>;
    changeSelection(selection: Expression): FilterClause;
    changeExclude(exclude: boolean): FilterClause;
    evaluate(now: Date, maxTime: Date, timezone: Timezone): FilterClause;
}
