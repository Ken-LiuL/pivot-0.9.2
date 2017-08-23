import * as React from 'react';
import { PlywoodValue } from 'plywood';
import { Stage } from '../../../common/models/index';
export interface BucketMarksProps extends React.Props<any> {
    stage: Stage;
    ticks: PlywoodValue[];
    scale: any;
}
export interface BucketMarksState {
}
export declare class BucketMarks extends React.Component<BucketMarksProps, BucketMarksState> {
    constructor();
    render(): JSX.Element;
}
