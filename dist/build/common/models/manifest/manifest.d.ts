import { DataSource, Splits, Colors } from '../index';
export interface Adjustment {
    splits: Splits;
    colors?: Colors;
}
export interface Resolution {
    description: string;
    adjustment: Adjustment;
}
export declare class Resolve {
    static NEVER: Resolve;
    static compare(r1: Resolve, r2: Resolve): number;
    static automatic(score: number, adjustment: Adjustment): Resolve;
    static manual(score: number, message: string, resolutions: Resolution[]): Resolve;
    static ready(score: number): Resolve;
    score: number;
    state: string;
    adjustment: Adjustment;
    message: string;
    resolutions: Resolution[];
    constructor(score: number, state: string, adjustment: Adjustment, message: string, resolutions: Resolution[]);
    toString(): string;
    valueOf(): string;
    isReady(): boolean;
    isAutomatic(): boolean;
    isManual(): boolean;
}
export declare type HandleCircumstance = (dataSource: DataSource, splits: Splits, colors: Colors, selected: boolean) => Resolve;
export declare type MeasureModeNeeded = 'any' | 'single' | 'multi';
export declare class Manifest {
    name: string;
    title: string;
    handleCircumstance: HandleCircumstance;
    measureModeNeed: MeasureModeNeeded;
    constructor(name: string, title: string, handleCircumstance: HandleCircumstance, measureModeNeed?: MeasureModeNeeded);
}
