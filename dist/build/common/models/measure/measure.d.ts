import { List } from 'immutable';
import { Instance } from 'immutable-class';
import { Expression, ExpressionJS, Datum, ApplyAction, AttributeInfo } from 'plywood';
export interface MeasureValue {
    name: string;
    title?: string;
    expression?: Expression;
    format?: string;
}
export interface MeasureJS {
    name: string;
    title?: string;
    expression?: ExpressionJS | string;
    format?: string;
}
export declare class Measure implements Instance<MeasureValue, MeasureJS> {
    static DEFAULT_FORMAT: string;
    static INTEGER_FORMAT: string;
    static isMeasure(candidate: any): candidate is Measure;
    static getMeasure(measures: List<Measure>, measureName: string): Measure;
    /**
     * Look for all instances of aggregateAction($blah) and return the blahs
     * @param ex
     * @returns {string[]}
     */
    static getAggregateReferences(ex: Expression): string[];
    /**
     * Look for all instances of countDistinct($blah) and return the blahs
     * @param ex
     * @returns {string[]}
     */
    static getCountDistinctReferences(ex: Expression): string[];
    static measuresFromAttributeInfo(attribute: AttributeInfo): Measure[];
    static fromJS(parameters: MeasureJS): Measure;
    name: string;
    title: string;
    expression: Expression;
    format: string;
    formatFn: (n: number) => string;
    constructor(parameters: MeasureValue);
    valueOf(): MeasureValue;
    toJS(): MeasureJS;
    toJSON(): MeasureJS;
    toString(): string;
    equals(other: Measure): boolean;
    toApplyAction(): ApplyAction;
    formatDatum(datum: Datum): string;
    changeTitle(title: string): Measure;
}
