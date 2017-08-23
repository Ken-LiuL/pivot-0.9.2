import { VisualizationProps } from '../../../common/models/index';
import { BaseVisualization, BaseVisualizationState } from '../base-visualization/base-visualization';
export interface GeoState extends BaseVisualizationState {
}
export declare class Geo extends BaseVisualization<GeoState> {
    static id: string;
    constructor();
    getDefaultState(): GeoState;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VisualizationProps): void;
    renderInternals(): JSX.Element;
}
