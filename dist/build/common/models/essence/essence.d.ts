import { List, OrderedSet } from 'immutable';
import { Instance } from 'immutable-class';
import { Timezone } from 'chronoshift';
import { Expression, RefExpression, TimeRange, ApplyAction, SortAction, Set } from 'plywood';
import { DataSource } from '../data-source/data-source';
import { Filter, FilterJS } from '../filter/filter';
import { FilterClause } from '../filter-clause/filter-clause';
import { Highlight, HighlightJS } from '../highlight/highlight';
import { Splits, SplitsJS } from '../splits/splits';
import { SplitCombine } from '../split-combine/split-combine';
import { Dimension } from '../dimension/dimension';
import { Measure } from '../measure/measure';
import { Colors, ColorsJS } from '../colors/colors';
import { Manifest, Resolve } from '../manifest/manifest';
export interface VisualizationAndResolve {
    visualization: Manifest;
    resolve: Resolve;
}
/**
 * FairGame   - Run all visualizations pretending that there is no current
 * UnfairGame - Run all visualizations but mark current vis as current
 * KeepAlways - Just keep the current one
 */
export declare enum VisStrategy {
    FairGame = 0,
    UnfairGame = 1,
    KeepAlways = 2,
}
export interface EssenceValue {
    visualizations?: Manifest[];
    dataSource?: DataSource;
    visualization: Manifest;
    timezone: Timezone;
    filter: Filter;
    splits: Splits;
    multiMeasureMode: boolean;
    singleMeasure: string;
    selectedMeasures: OrderedSet<string>;
    pinnedDimensions: OrderedSet<string>;
    colors: Colors;
    pinnedSort: string;
    compare: Filter;
    highlight: Highlight;
}
export interface EssenceJS {
    visualization?: string;
    timezone?: string;
    filter?: FilterJS;
    splits?: SplitsJS;
    multiMeasureMode?: boolean;
    singleMeasure?: string;
    selectedMeasures?: string[];
    pinnedDimensions?: string[];
    colors?: ColorsJS;
    pinnedSort?: string;
    compare?: FilterJS;
    highlight?: HighlightJS;
}
export interface EssenceContext {
    dataSource: DataSource;
    visualizations: Manifest[];
}
export declare class Essence implements Instance<EssenceValue, EssenceJS> {
    static isEssence(candidate: any): candidate is Essence;
    static getBestVisualization(visualizations: Manifest[], dataSource: DataSource, splits: Splits, colors: Colors, currentVisualization: Manifest): VisualizationAndResolve;
    static fromHash(hash: string, context: EssenceContext): Essence;
    static fromDataSource(dataSource: DataSource, context: EssenceContext): Essence;
    static fromJS(parameters: EssenceJS, context?: EssenceContext): Essence;
    dataSource: DataSource;
    visualizations: Manifest[];
    visualization: Manifest;
    timezone: Timezone;
    filter: Filter;
    splits: Splits;
    multiMeasureMode: boolean;
    singleMeasure: string;
    selectedMeasures: OrderedSet<string>;
    pinnedDimensions: OrderedSet<string>;
    colors: Colors;
    pinnedSort: string;
    compare: Filter;
    highlight: Highlight;
    visResolve: Resolve;
    constructor(parameters: EssenceValue);
    valueOf(): EssenceValue;
    toJS(): EssenceJS;
    toJSON(): EssenceJS;
    toString(): string;
    equals(other: Essence): boolean;
    toHash(): string;
    getURL(urlPrefix: string): string;
    getTimeAttribute(): RefExpression;
    getTimeDimension(): Dimension;
    evaluateSelection(selection: Expression, now?: Date): TimeRange;
    evaluateClause(clause: FilterClause, now?: Date): FilterClause;
    getEffectiveFilter(highlightId?: string, unfilterDimension?: Dimension): Filter;
    getTimeSelection(): Expression;
    isFixedMeasureMode(): boolean;
    getEffectiveMultiMeasureMode(): boolean;
    getEffectiveMeasures(): List<Measure>;
    getMeasures(): List<Measure>;
    getEffectiveSelectedMeasure(): OrderedSet<string>;
    differentDataSource(other: Essence): boolean;
    differentTimezone(other: Essence): boolean;
    differentTimezoneMatters(other: Essence): boolean;
    differentFilter(other: Essence): boolean;
    differentSplits(other: Essence): boolean;
    differentEffectiveSplits(other: Essence): boolean;
    differentColors(other: Essence): boolean;
    differentSelectedMeasures(other: Essence): boolean;
    differentEffectiveMeasures(other: Essence): boolean;
    newSelectedMeasures(other: Essence): boolean;
    newEffectiveMeasures(other: Essence): boolean;
    differentPinnedDimensions(other: Essence): boolean;
    differentPinnedSort(other: Essence): boolean;
    differentCompare(other: Essence): boolean;
    differentHighligh(other: Essence): boolean;
    differentEffectiveFilter(other: Essence, highlightId?: string, unfilterDimension?: Dimension): boolean;
    highlightOn(owner: string, measure?: string): boolean;
    highlightOnDifferentMeasure(owner: string, measure: string): boolean;
    getSingleHighlightSet(): Set;
    getApplyForSort(sort: SortAction): ApplyAction;
    getCommonSort(): SortAction;
    updateDataSource(newDataSource: DataSource): Essence;
    changeFilter(filter: Filter, removeHighlight?: boolean): Essence;
    changeTimezone(newTimezone: Timezone): Essence;
    changeTimeSelection(check: Expression): Essence;
    convertToSpecificFilter(): Essence;
    changeSplits(splits: Splits, strategy: VisStrategy): Essence;
    changeSplit(splitCombine: SplitCombine, strategy: VisStrategy): Essence;
    addSplit(split: SplitCombine, strategy: VisStrategy): Essence;
    removeSplit(split: SplitCombine, strategy: VisStrategy): Essence;
    updateSplitsWithFilter(): Essence;
    changeColors(colors: Colors): Essence;
    changeVisualization(visualization: Manifest): Essence;
    pin(dimension: Dimension): Essence;
    unpin(dimension: Dimension): Essence;
    getPinnedSortMeasure(): Measure;
    changePinnedSortMeasure(measure: Measure): Essence;
    toggleMultiMeasureMode(): Essence;
    changeSingleMeasure(measure: Measure): Essence;
    toggleSelectedMeasure(measure: Measure): Essence;
    toggleEffectiveMeasure(measure: Measure): Essence;
    acceptHighlight(): Essence;
    changeHighlight(owner: string, measure: string, delta: Filter): Essence;
    dropHighlight(): Essence;
}
