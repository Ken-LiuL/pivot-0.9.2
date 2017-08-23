import { Dataset, Datum, PseudoDatum } from 'plywood';
import { Stage, Measure, VisualizationProps, DatasetLoad } from '../../../common/models/index';
import { ScrollerLayout } from '../../components/scroller/scroller';
import { BaseVisualization, BaseVisualizationState } from '../base-visualization/base-visualization';
import { BarCoordinates } from './bar-coordinates';
export interface BubbleInfo {
    measure: Measure;
    chartIndex: number;
    path: Datum[];
    coordinates: BarCoordinates;
    splitIndex?: number;
    segmentLabel?: string;
}
export interface BarChartState extends BaseVisualizationState {
    hoverInfo?: BubbleInfo;
    selectionInfo?: BubbleInfo;
    flatData?: PseudoDatum[];
    maxNumberOfLeaves?: number[];
}
export declare class BarChart extends BaseVisualization<BarChartState> {
    static id: string;
    private coordinatesCache;
    constructor();
    getDefaultState(): BarChartState;
    componentWillReceiveProps(nextProps: VisualizationProps): void;
    calculateMousePosition(x: number, y: number): BubbleInfo;
    findPathForIndices(indices: number[]): Datum[];
    findBarCoordinatesForX(x: number, coordinates: BarCoordinates[], currentPath: number[]): {
        path: number[];
        coordinates: BarCoordinates;
    };
    onSimpleScroll(scrollTop: number, scrollLeft: number): void;
    onMouseMove(x: number, y: number): void;
    onMouseLeave(): void;
    onClick(x: number, y: number): void;
    getYExtent(data: Datum[], measure: Measure): number[];
    getYScale(measure: Measure, yAxisStage: Stage): d3.scale.Linear<number, number>;
    hasValidYExtent(measure: Measure, data: Datum[]): boolean;
    getSingleChartStage(): Stage;
    getOuterChartHeight(chartStage: Stage): number;
    getAxisStages(chartStage: Stage): {
        xAxisStage: Stage;
        yAxisStage: Stage;
    };
    getScrollerLayout(chartStage: Stage, xAxisStage: Stage, yAxisStage: Stage): ScrollerLayout;
    getBubbleTopOffset(y: number, chartIndex: number, chartStage: Stage): number;
    getBubbleLeftOffset(x: number): number;
    canShowBubble(leftOffset: number, topOffset: number): boolean;
    renderSelectionBubble(hoverInfo: BubbleInfo): JSX.Element;
    onBubbleClose(): void;
    renderHoverBubble(hoverInfo: BubbleInfo): JSX.Element;
    isSelected(path: Datum[], measure: Measure): boolean;
    isFaded(): boolean;
    hasAnySelectionGoingOn(): boolean;
    isHovered(path: Datum[], measure: Measure): boolean;
    renderBars(data: Datum[], measure: Measure, chartIndex: number, chartStage: Stage, xAxisStage: Stage, coordinates: BarCoordinates[], splitIndex?: number, path?: Datum[]): {
        bars: JSX.Element[];
        highlight: JSX.Element;
    };
    renderSelectionHighlight(chartStage: Stage, coordinates: BarCoordinates, chartIndex: number): JSX.Element;
    renderXAxis(data: Datum[], coordinates: BarCoordinates[], xAxisStage: Stage): JSX.Element;
    getYAxisStuff(dataset: Dataset, measure: Measure, chartStage: Stage, chartIndex: number): {
        yGridLines: JSX.Element;
        yAxis: JSX.Element;
        yScale: d3.scale.Linear<number, number>;
    };
    isChartVisible(chartIndex: number, xAxisStage: Stage): boolean;
    renderChart(dataset: Dataset, coordinates: BarCoordinates[], measure: Measure, chartIndex: number, chartStage: Stage, getX: any): {
        yAxis: JSX.Element;
        chart: JSX.Element;
        highlight: JSX.Element;
    };
    precalculate(props: VisualizationProps, datasetLoad?: DatasetLoad): void;
    maxNumberOfLeaves(data: Datum[], maxima: number[], level: number): void;
    getPrimaryXScale(): d3.scale.Ordinal<string, number>;
    getBarDimensions(xRangeBand: number): {
        stepWidth: number;
        barWidth: number;
        barOffset: number;
    };
    getXValues(maxNumberOfLeaves: number[]): {
        padLeft: number;
        usedWidth: number;
    };
    getBarsCoordinates(chartIndex: number, xScale: d3.scale.Ordinal<string, number>): BarCoordinates[];
    getSubCoordinates(data: Datum[], measure: Measure, chartStage: Stage, getX: (d: Datum, i: number) => string, xScale: d3.scale.Ordinal<string, number>, scaleY: d3.scale.Linear<number, number>, splitIndex?: number): BarCoordinates[];
    renderRightGutter(measures: Measure[], yAxisStage: Stage, yAxes: JSX.Element[]): JSX.Element;
    renderSelectionContainer(selectionHighlight: JSX.Element, chartIndex: number, chartStage: Stage): JSX.Element;
    renderInternals(): JSX.Element;
}
