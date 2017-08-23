import { Instance } from 'immutable-class';
export interface MaxTimeValue {
    time: Date;
    updated: Date;
}
export interface MaxTimeJS {
    time: Date | string;
    updated?: Date | string;
}
export declare class MaxTime implements Instance<MaxTimeValue, MaxTimeJS> {
    static isMaxTime(candidate: any): candidate is MaxTime;
    static fromNow(): MaxTime;
    static fromDate(time: Date): MaxTime;
    static fromJS(parameters: MaxTimeJS): MaxTime;
    time: Date;
    updated: Date;
    constructor(parameters: MaxTimeValue);
    valueOf(): MaxTimeValue;
    toJS(): MaxTimeJS;
    toJSON(): MaxTimeJS;
    toString(): string;
    equals(other: MaxTime): boolean;
}
