import { Timezone, Duration } from 'chronoshift';
import { TimeRange } from 'plywood';
export interface Locale {
    shortDays: string[];
    shortMonths: string[];
    weekStart: number;
}
export declare enum DisplayYear {
    ALWAYS = 0,
    NEVER = 1,
    IF_DIFF = 2,
}
export declare function getEndWallTimeInclusive(exclusiveEnd: Date, timezone: Timezone): Date;
export declare function exclusiveToInclusiveEnd(exclusiveEnd: Date): Date;
export declare function formatTimeRange(timeRange: TimeRange, timezone: Timezone, displayYear: DisplayYear): string;
export declare function monthToWeeks(firstDayOfMonth: Date, timezone: Timezone, locale: Locale): Date[][];
export declare function prependDays(timezone: Timezone, weekPrependTo: Date[], countPrepend: number): Date[];
export declare function appendDays(timezone: Timezone, weekAppendTo: Date[], countAppend: number): Date[];
export declare function shiftOneDay(floored: Date, timezone: Timezone): Date;
export declare function datesEqual(d1: Date, d2: Date): boolean;
export declare function getWallTimeDay(date: Date, timezone: Timezone): number;
export declare function getWallTimeMonthWithYear(date: Date, timezone: Timezone): string;
export declare function wallTimeInclusiveEndEqual(d1: Date, d2: Date, timezone: Timezone): boolean;
export declare function getWallTimeString(date: Date, timezone: Timezone, includeTime?: boolean, delimiter?: string): string;
export declare function formatTimeBasedOnGranularity(range: TimeRange, granularity: Duration, timezone: Timezone, locale: Locale): string;
export declare function formatGranularity(granularity: string): string;
