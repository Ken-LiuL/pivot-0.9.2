import { List } from 'immutable';
import { Instance } from 'immutable-class';
import { Expression } from 'plywood';
import { Dimension } from '../dimension/dimension';
import { Filter, FilterJS } from '../filter/filter';
export interface HighlightValue {
    owner: string;
    delta: Filter;
    measure?: string;
}
export interface HighlightJS {
    owner: string;
    delta: FilterJS;
    measure?: string;
}
export declare class Highlight implements Instance<HighlightValue, HighlightJS> {
    static isHighlight(candidate: any): candidate is Highlight;
    static fromJS(parameters: HighlightJS): Highlight;
    owner: string;
    delta: Filter;
    measure: string;
    constructor(parameters: HighlightValue);
    valueOf(): HighlightValue;
    toJS(): HighlightJS;
    toJSON(): HighlightJS;
    toString(): string;
    equals(other: Highlight): boolean;
    applyToFilter(filter: Filter): Filter;
    constrainToDimensions(dimensions: List<Dimension>, timeAttribute: Expression): Highlight;
}
