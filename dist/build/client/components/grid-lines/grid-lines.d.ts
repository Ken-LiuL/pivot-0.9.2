import * as React from 'react';
import { Stage } from '../../../common/models/index';
export interface GridLinesProps extends React.Props<any> {
    orientation: string;
    stage: Stage;
    ticks: any[];
    scale: any;
}
export interface GridLinesState {
}
export declare class GridLines extends React.Component<GridLinesProps, GridLinesState> {
    constructor();
    render(): JSX.Element;
}
