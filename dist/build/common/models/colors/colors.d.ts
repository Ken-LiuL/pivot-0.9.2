import { Instance } from 'immutable-class';
import { Set, FilterAction, LimitAction } from 'plywood';
export interface ColorsValue {
    dimension: string;
    values?: Lookup<any>;
    hasNull?: boolean;
    limit?: number;
}
export interface ColorsJS {
    dimension: string;
    values?: Lookup<any>;
    hasNull?: boolean;
    limit?: number;
}
export declare class Colors implements Instance<ColorsValue, ColorsJS> {
    static isColors(candidate: any): candidate is Colors;
    static fromLimit(dimension: string, limit: number): Colors;
    static fromValues(dimension: string, values: any[]): Colors;
    static fromJS(parameters: ColorsJS): Colors;
    dimension: string;
    values: Lookup<any>;
    hasNull: boolean;
    limit: number;
    constructor(parameters: ColorsValue);
    valueOf(): ColorsValue;
    toJS(): ColorsJS;
    toJSON(): ColorsJS;
    toString(): string;
    equals(other: Colors): boolean;
    numColors(): number;
    toArray(): any[];
    toSet(): Set;
    toHavingFilter(segmentName?: string): FilterAction;
    toLimitAction(): LimitAction;
    toggle(v: any): Colors;
    valueIndex(v: any): number;
    nextIndex(): number;
    has(v: any): boolean;
    add(v: any): Colors;
    remove(v: any): Colors;
    getColors(valuesToColor: any[]): string[];
}
