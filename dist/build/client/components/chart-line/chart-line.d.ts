import * as React from 'react';
import { Dataset, Datum, PlywoodRange } from 'plywood';
import { Stage } from '../../../common/models/index';
export interface ChartLineProps extends React.Props<any> {
    stage: Stage;
    dataset: Dataset;
    getX: (d: Datum) => PlywoodRange;
    getY: (d: Datum) => any;
    scaleX: (v: any) => number;
    scaleY: (v: any) => number;
    color: string;
    showArea?: boolean;
    hoverRange?: PlywoodRange;
}
export interface ChartLineState {
}
export declare class ChartLine extends React.Component<ChartLineProps, ChartLineState> {
    constructor();
    render(): JSX.Element;
}
