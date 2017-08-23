import * as React from 'react';
import { Datum, PseudoDatum } from 'plywood';
import { Formatter } from '../../../common/utils/formatter/formatter';
import { Essence, Measure, VisualizationProps, DatasetLoad } from '../../../common/models/index';
import { BaseVisualization, BaseVisualizationState } from '../base-visualization/base-visualization';
export interface PositionHover {
    what: string;
    measure?: Measure;
    row?: Datum;
}
export interface TableState extends BaseVisualizationState {
    flatData?: PseudoDatum[];
    hoverRow?: Datum;
}
export declare class Table extends BaseVisualization<TableState> {
    static id: string;
    constructor();
    getDefaultState(): TableState;
    calculateMousePosition(x: number, y: number): PositionHover;
    onClick(x: number, y: number): void;
    onMouseMove(x: number, y: number): void;
    onMouseLeave(): void;
    precalculate(props: VisualizationProps, datasetLoad?: DatasetLoad): void;
    getScalesForColumns(essence: Essence, flatData: PseudoDatum[]): d3.scale.Linear<number, number>[];
    getFormattersFromMeasures(essence: Essence, flatData: PseudoDatum[]): Formatter[];
    getIdealMeasureWidth(essence: Essence): number;
    makeMeasuresRenderer(essence: Essence, formatters: Formatter[], hScales: d3.scale.Linear<number, number>[]): (datum: PseudoDatum) => JSX.Element[];
    renderRow(index: number, rowMeasures: JSX.Element[], style: React.CSSProperties, rowClass: string): JSX.Element;
    renderHeaderColumns(essence: Essence, hoverMeasure: Measure, measureWidth: number): JSX.Element[];
    renderCornerSortArrow(essence: Essence): JSX.Element;
    onSimpleScroll(scrollTop: number, scrollLeft: number): void;
    getVisibleIndices(rowCount: number, height: number): number[];
    renderInternals(): JSX.Element;
}
