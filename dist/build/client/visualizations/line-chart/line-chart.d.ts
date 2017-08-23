import { Dataset, PlywoodRange } from 'plywood';
import { Dimension, Stage, Measure, VisualizationProps, DatasetLoad } from '../../../common/models/index';
import { BaseVisualization, BaseVisualizationState } from '../base-visualization/base-visualization';
export declare type continuousValueType = Date | number;
export interface LineChartState extends BaseVisualizationState {
    dragStartValue?: continuousValueType;
    dragRange?: PlywoodRange;
    roundDragRange?: PlywoodRange;
    hoverRange?: PlywoodRange;
    continuousDimension?: Dimension;
    axisRange?: PlywoodRange;
    scaleX?: any;
    xTicks?: continuousValueType[];
}
export declare class LineChart extends BaseVisualization<LineChartState> {
    static id: string;
    constructor();
    getDefaultState(): LineChartState;
    getMyEventX(e: MouseEvent): number;
    onMouseDown(measure: Measure, e: MouseEvent): void;
    onMouseMove(dataset: Dataset, measure: Measure, scaleX: any, e: MouseEvent): void;
    getDragRange(e: MouseEvent): PlywoodRange;
    floorRange(dragRange: PlywoodRange): PlywoodRange;
    globalMouseMoveListener(e: MouseEvent): void;
    globalMouseUpListener(e: MouseEvent): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    resetDrag(): void;
    onMouseLeave(measure: Measure, e: MouseEvent): void;
    renderHighlighter(): JSX.Element;
    renderChartBubble(dataset: Dataset, measure: Measure, chartIndex: number, containerStage: Stage, chartStage: Stage, extentY: number[], scaleY: any): JSX.Element;
    renderChart(dataset: Dataset, measure: Measure, chartIndex: number, containerStage: Stage, chartStage: Stage): JSX.Element;
    precalculate(props: VisualizationProps, datasetLoad?: DatasetLoad): void;
    renderInternals(): JSX.Element;
}
