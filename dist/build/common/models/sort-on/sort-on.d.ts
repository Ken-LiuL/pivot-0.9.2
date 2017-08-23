import { Instance } from 'immutable-class';
import { Expression, SortAction } from 'plywood';
import { Dimension, DimensionJS } from '../dimension/dimension';
import { Measure, MeasureJS } from '../measure/measure';
import { DataSource } from '../data-source/data-source';
export interface SortOnValue {
    dimension?: Dimension;
    measure?: Measure;
}
export interface SortOnJS {
    dimension?: DimensionJS;
    measure?: MeasureJS;
}
export declare class SortOn implements Instance<SortOnValue, SortOnJS> {
    static isSortOn(candidate: any): candidate is SortOn;
    static equal(s1: SortOn, s2: SortOn): boolean;
    static getName(s: SortOn): string;
    static getTitle(s: SortOn): string;
    static fromDimension(dimension: Dimension): SortOn;
    static fromMeasure(measure: Measure): SortOn;
    static fromSortAction(sortAction: SortAction, dataSource: DataSource, fallbackDimension: Dimension): SortOn;
    static fromJS(parameters: SortOnJS): SortOn;
    dimension: Dimension;
    measure: Measure;
    constructor(parameters: SortOnValue);
    valueOf(): SortOnValue;
    toJS(): SortOnJS;
    toJSON(): SortOnJS;
    toString(): string;
    equals(other: SortOn): boolean;
    toName(): string;
    getTitle(): string;
    getExpression(): Expression;
}
