import { Instance } from 'immutable-class';
import { Duration } from 'chronoshift';
import { MaxTime } from '../max-time/max-time';
export interface RefreshRuleValue {
    rule: string;
    refresh?: Duration;
    time?: Date;
}
export interface RefreshRuleJS {
    rule: string;
    refresh?: string;
    time?: Date | string;
}
export declare class RefreshRule implements Instance<RefreshRuleValue, RefreshRuleJS> {
    static FIXED: string;
    static QUERY: string;
    static REALTIME: string;
    static DEFAULT_QUERY_REFRESH: Duration;
    static isRefreshRule(candidate: any): candidate is RefreshRule;
    static query(refresh?: Duration): RefreshRule;
    static fromJS(parameters: RefreshRuleJS): RefreshRule;
    rule: string;
    refresh: Duration;
    time: Date;
    constructor(parameters: RefreshRuleValue);
    valueOf(): RefreshRuleValue;
    toJS(): RefreshRuleJS;
    toJSON(): RefreshRuleJS;
    toString(): string;
    equals(other: RefreshRule): boolean;
    isFixed(): boolean;
    isQuery(): boolean;
    isRealtime(): boolean;
    shouldUpdate(maxTime: MaxTime): boolean;
}
