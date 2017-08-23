import * as React from 'react';
import { Expression } from 'plywood';
import { Measure, VisualizationProps, DatasetLoad, Essence } from '../../../common/models/index';
export interface BaseVisualizationState {
    datasetLoad?: DatasetLoad;
    dragOnMeasure?: Measure;
    scrollLeft?: number;
    scrollTop?: number;
    hoverMeasure?: Measure;
}
export declare class BaseVisualization<S extends BaseVisualizationState> extends React.Component<VisualizationProps, S> {
    static id: string;
    protected _isMounted: boolean;
    constructor();
    getDefaultState(): BaseVisualizationState;
    protected id: string;
    protected onScroll(e: UIEvent): void;
    protected makeQuery(essence: Essence): Expression;
    protected fetchData(essence: Essence): void;
    private lastRenderResult;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VisualizationProps): void;
    componentWillUnmount(): void;
    protected globalMouseMoveListener(e: MouseEvent): void;
    protected globalMouseUpListener(e: MouseEvent): void;
    protected globalKeyDownListener(e: KeyboardEvent): void;
    protected renderInternals(): JSX.Element;
    protected precalculate(props: VisualizationProps, datasetLoad?: DatasetLoad): void;
    render(): JSX.Element;
}
