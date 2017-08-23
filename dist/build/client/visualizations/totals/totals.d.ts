import { Expression } from 'plywood';
import { Essence, VisualizationProps, DatasetLoad } from '../../../common/models/index';
import { BaseVisualization, BaseVisualizationState } from '../base-visualization/base-visualization';
export declare class Totals extends BaseVisualization<BaseVisualizationState> {
    static id: string;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VisualizationProps): void;
    componentWillUnmount(): void;
    makeQuery(essence: Essence): Expression;
    precalculate(props: VisualizationProps, datasetLoad?: DatasetLoad): void;
    renderInternals(): JSX.Element;
}
