import * as React from 'react';
import { Essence, Dimension, SortOn } from '../../../common/models/index';
export interface PinboardMeasureTileProps extends React.Props<any> {
    essence: Essence;
    title: string;
    dimension?: Dimension;
    sortOn: SortOn;
    onSelect: (sel: SortOn) => void;
}
export interface PinboardMeasureTileState {
}
export declare class PinboardMeasureTile extends React.Component<PinboardMeasureTileProps, PinboardMeasureTileState> {
    constructor();
    render(): JSX.Element;
}
