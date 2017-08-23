import * as React from 'react';
import { Stage } from '../../../common/models/index';
export interface VerticalAxisProps extends React.Props<any> {
    stage: Stage;
    ticks: number[];
    scale: any;
    topLineExtend?: number;
    hideZero?: boolean;
}
export interface VerticalAxisState {
}
export declare class VerticalAxis extends React.Component<VerticalAxisProps, VerticalAxisState> {
    static defaultProps: {
        topLineExtend: number;
    };
    constructor();
    render(): JSX.Element;
}
