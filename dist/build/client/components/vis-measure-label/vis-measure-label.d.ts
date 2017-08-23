import * as React from 'react';
import { Datum } from 'plywood';
import { Measure } from '../../../common/models/index';
export interface VisMeasureLabelProps extends React.Props<any> {
    measure: Measure;
    datum: Datum;
}
export interface VisMeasureLabelState {
}
export declare class VisMeasureLabel extends React.Component<VisMeasureLabelProps, VisMeasureLabelState> {
    constructor();
    render(): JSX.Element;
}
