import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Stage, Clicker, Essence } from '../../../common/models/index';
export interface DimensionMeasurePanelProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    menuStage: Stage;
    triggerFilterMenu: Fn;
    triggerSplitMenu: Fn;
    style?: React.CSSProperties;
    getUrlPrefix?: () => string;
}
export interface DimensionMeasurePanelState {
}
export declare class DimensionMeasurePanel extends React.Component<DimensionMeasurePanelProps, DimensionMeasurePanelState> {
    constructor();
    render(): JSX.Element;
}
