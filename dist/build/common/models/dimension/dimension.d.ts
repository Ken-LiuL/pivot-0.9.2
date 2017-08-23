import { List } from 'immutable';
import { Instance } from 'immutable-class';
import { Expression, ExpressionJS } from 'plywood';
import { Granularity, GranularityJS } from "../granularity/granularity";
export interface DimensionValue {
    name: string;
    title?: string;
    expression?: Expression;
    kind?: string;
    url?: string;
    granularities?: Granularity[];
    bucketedBy?: Granularity;
}
export interface DimensionJS {
    name: string;
    title?: string;
    expression?: ExpressionJS | string;
    kind?: string;
    url?: string;
    granularities?: GranularityJS[];
    bucketedBy?: GranularityJS;
}
export declare class Dimension implements Instance<DimensionValue, DimensionJS> {
    static isDimension(candidate: any): candidate is Dimension;
    static getDimension(dimensions: List<Dimension>, dimensionName: string): Dimension;
    static getDimensionByExpression(dimensions: List<Dimension>, expression: Expression): Dimension;
    static fromJS(parameters: DimensionJS): Dimension;
    name: string;
    title: string;
    expression: Expression;
    kind: string;
    className: string;
    url: string;
    granularities: Granularity[];
    bucketedBy: Granularity;
    constructor(parameters: DimensionValue);
    valueOf(): DimensionValue;
    toJS(): DimensionJS;
    toJSON(): DimensionJS;
    toString(): string;
    equals(other: Dimension): boolean;
    isContinuous(): boolean;
    change(propertyName: string, newValue: any): Dimension;
    changeKind(newKind: string): Dimension;
    changeName(newName: string): Dimension;
    changeTitle(newTitle: string): Dimension;
}
