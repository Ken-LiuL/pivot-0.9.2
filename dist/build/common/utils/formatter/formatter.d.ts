import { Timezone } from 'chronoshift';
import { Dimension, FilterClause } from '../../models/index';
import { DisplayYear } from '../../utils/time/time';
export interface Formatter {
    (n: number): string;
}
export declare function getMiddleNumber(values: number[]): number;
export declare function formatterFromData(values: number[], format: string): Formatter;
export declare function formatValue(value: any, timezone?: Timezone, displayYear?: DisplayYear): string;
export declare function formatFilterClause(dimension: Dimension, clause: FilterClause, timezone: Timezone, verbose?: boolean): string;
export declare function getFormattedClause(dimension: Dimension, clause: FilterClause, timezone: Timezone, verbose?: boolean): {
    title: string;
    values: string;
};
