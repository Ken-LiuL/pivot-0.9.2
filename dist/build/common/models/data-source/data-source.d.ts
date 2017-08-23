import * as Q from 'q';
import { List, OrderedSet } from 'immutable';
import { Instance } from 'immutable-class';
import { Duration, Timezone } from 'chronoshift';
import { Expression, ExpressionJS, Executor, External, RefExpression, Dataset, Attributes, AttributeJSs, SortAction, DatasetFullType, CustomDruidAggregations } from 'plywood';
import { Dimension, DimensionJS } from '../dimension/dimension';
import { Measure, MeasureJS } from '../measure/measure';
import { Filter, FilterJS } from '../filter/filter';
import { SplitsJS } from '../splits/splits';
import { MaxTime, MaxTimeJS } from '../max-time/max-time';
import { RefreshRule, RefreshRuleJS } from '../refresh-rule/refresh-rule';
import { Cluster } from '../cluster/cluster';
export declare type Introspection = 'none' | 'no-autofill' | 'autofill-dimensions-only' | 'autofill-measures-only' | 'autofill-all';
export interface DataSourceValue {
    name: string;
    title?: string;
    engine: string;
    source: string;
    subsetFilter?: Expression;
    rollup?: boolean;
    options?: DataSourceOptions;
    introspection?: Introspection;
    attributeOverrides?: Attributes;
    attributes?: Attributes;
    derivedAttributes?: Lookup<Expression>;
    dimensions?: List<Dimension>;
    measures?: List<Measure>;
    timeAttribute?: RefExpression;
    defaultTimezone?: Timezone;
    defaultFilter?: Filter;
    defaultDuration?: Duration;
    defaultSortMeasure?: string;
    defaultSelectedMeasures?: OrderedSet<string>;
    defaultPinnedDimensions?: OrderedSet<string>;
    refreshRule?: RefreshRule;
    maxTime?: MaxTime;
    cluster?: Cluster;
    executor?: Executor;
}
export interface DataSourceJS {
    name: string;
    title?: string;
    engine: string;
    source: string;
    subsetFilter?: ExpressionJS;
    rollup?: boolean;
    options?: DataSourceOptions;
    introspection?: Introspection;
    attributeOverrides?: AttributeJSs;
    attributes?: AttributeJSs;
    derivedAttributes?: Lookup<ExpressionJS>;
    dimensions?: DimensionJS[];
    measures?: MeasureJS[];
    timeAttribute?: string;
    defaultTimezone?: string;
    defaultFilter?: FilterJS;
    defaultDuration?: string;
    defaultSortMeasure?: string;
    defaultSelectedMeasures?: string[];
    defaultPinnedDimensions?: string[];
    refreshRule?: RefreshRuleJS;
    maxTime?: MaxTimeJS;
    longForm?: LongForm;
}
export interface DataSourceOptions {
    customAggregations?: CustomDruidAggregations;
    defaultSplits?: SplitsJS;
    defaultSplitDimension?: string;
    skipIntrospection?: boolean;
    disableAutofill?: boolean;
    attributeOverrides?: AttributeJSs;
}
export interface DataSourceContext {
    cluster?: Cluster;
    executor?: Executor;
}
export interface LongForm {
    metricColumn: string;
    possibleAggregates: Lookup<any>;
    addSubsetFilter?: boolean;
    titleNameTrim?: string;
    values: LongFormValue[];
}
export interface LongFormValue {
    value: string;
    aggregates: string[];
}
export declare class DataSource implements Instance<DataSourceValue, DataSourceJS> {
    static DEFAULT_INTROSPECTION: Introspection;
    static INTROSPECTION_VALUES: Introspection[];
    static DEFAULT_TIMEZONE: Timezone;
    static DEFAULT_DURATION: Duration;
    static isDataSource(candidate: any): candidate is DataSource;
    static updateMaxTime(dataSource: DataSource): Q.Promise<DataSource>;
    static fromClusterAndExternal(name: string, cluster: Cluster, external: External): DataSource;
    static fromJS(parameters: DataSourceJS, context?: DataSourceContext): DataSource;
    name: string;
    title: string;
    engine: string;
    source: string;
    subsetFilter: Expression;
    rollup: boolean;
    options: DataSourceOptions;
    introspection: Introspection;
    attributes: Attributes;
    attributeOverrides: Attributes;
    derivedAttributes: Lookup<Expression>;
    dimensions: List<Dimension>;
    measures: List<Measure>;
    timeAttribute: RefExpression;
    defaultTimezone: Timezone;
    defaultFilter: Filter;
    defaultDuration: Duration;
    defaultSortMeasure: string;
    defaultSelectedMeasures: OrderedSet<string>;
    defaultPinnedDimensions: OrderedSet<string>;
    refreshRule: RefreshRule;
    maxTime: MaxTime;
    cluster: Cluster;
    executor: Executor;
    constructor(parameters: DataSourceValue);
    valueOf(): DataSourceValue;
    toJS(): DataSourceJS;
    toJSON(): DataSourceJS;
    toString(): string;
    equals(other: DataSource): boolean;
    equalsWithoutMaxTime(other: DataSource): boolean;
    private _validateDefaults();
    toExternal(): External;
    getMainTypeContext(): DatasetFullType;
    getIssues(): string[];
    updateCluster(cluster: Cluster): DataSource;
    updateWithDataset(dataset: Dataset): DataSource;
    updateWithExternal(external: External): DataSource;
    attachExecutor(executor: Executor): DataSource;
    toClientDataSource(): DataSource;
    isQueryable(): boolean;
    getMaxTimeDate(): Date;
    updatedText(): string;
    shouldUpdateMaxTime(): boolean;
    getDimension(dimensionName: string): Dimension;
    getDimensionByExpression(expression: Expression): Dimension;
    getDimensionByKind(kind: string): List<Dimension>;
    getTimeDimension(): Dimension;
    isTimeAttribute(ex: Expression): boolean;
    getMeasure(measureName: string): Measure;
    getMeasureByExpression(expression: Expression): Measure;
    changeDimensions(dimensions: List<Dimension>): DataSource;
    rolledUp(): boolean;
    /**
     * This function tries to deduce the structure of the dataSource based on the dimensions and measures defined within.
     * It should only be used when, for some reason, introspection if not available.
     */
    deduceAttributes(): Attributes;
    addAttributes(newAttributes: Attributes): DataSource;
    change(propertyName: string, newValue: any): DataSource;
    changeMaxTime(maxTime: MaxTime): DataSource;
    changeTitle(title: string): DataSource;
    changeMeasures(measures: List<Measure>): DataSource;
    getDefaultSortAction(): SortAction;
}
