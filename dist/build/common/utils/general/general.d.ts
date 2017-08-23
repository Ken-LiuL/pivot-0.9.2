import { List } from 'immutable';
import { Equalable } from 'immutable-class';
export interface Fn {
    (): void;
}
export declare function hasOwnProperty(obj: any, key: string | number): boolean;
export declare function moveInList<T>(list: List<T>, itemIndex: number, insertPoint: number): List<T>;
export declare function makeTitle(name: string): string;
export declare function immutableListsEqual<T extends Equalable>(listA: List<T>, listB: List<T>): boolean;
export declare function collect(wait: number, fn: Fn): Fn;
export declare function makeUrlSafeName(name: string): string;
export declare function verifyUrlSafeName(name: string): void;
export declare function arraySum(inputArray: number[]): number;
export declare function findFirstBiggerIndex<T>(array: T[], elementToFind: T, valueOf: (input: T) => number): number;
export declare function findBiggerClosestToIdeal<T>(array: T[], elementToFind: T, ideal: T, valueOf: (input: T) => number): T;
export declare function findExactIndex<T>(array: T[], elementToFind: T, valueOf: (input: T) => number): number;
export declare function findMaxValueIndex<T>(array: T[], valueOf: (input: T) => number): number;
export declare function findMinValueIndex<T>(array: T[], valueOf: (input: T) => number): number;
export declare function toSignificantDigits(n: number, digits: number): number;
export declare function getNumberOfWholeDigits(n: number): number;
export declare function inlineVars(obj: any, vs: Lookup<string>): any;
export declare function ensureOneOf(value: string, values: string[], messagePrefix: string): void;
export declare function pluralIfNeeded(n: number, thing: string): string;
