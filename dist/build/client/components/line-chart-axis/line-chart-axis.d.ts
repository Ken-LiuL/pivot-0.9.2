import * as React from 'react';
import { Timezone } from 'chronoshift';
import { Stage } from '../../../common/models/index';
export interface LineChartAxisProps extends React.Props<any> {
    stage: Stage;
    ticks: (Date | number)[];
    scale: any;
    timezone: Timezone;
}
export interface LineChartAxisState {
}
export declare class LineChartAxis extends React.Component<LineChartAxisProps, LineChartAxisState> {
    constructor();
    render(): JSX.Element;
}
