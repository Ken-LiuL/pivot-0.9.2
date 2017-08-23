import * as React from 'react';
import { Essence, Dimension } from '../../../common/models/index';
export declare const ANY_VALUE: any;
export interface NumberRangePickerProps extends React.Props<any> {
    start: number;
    end: number;
    essence: Essence;
    dimension: Dimension;
    onRangeStartChange: (n: number) => void;
    onRangeEndChange: (n: number) => void;
}
export interface NumberRangePickerState {
    leftOffset?: number;
    rightBound?: number;
    min?: number;
    max?: number;
    step?: number;
    loading?: boolean;
    error?: any;
}
export declare class NumberRangePicker extends React.Component<NumberRangePickerProps, NumberRangePickerState> {
    mounted: boolean;
    constructor();
    fetchData(essence: Essence, dimension: Dimension, rightBound: number): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    relativePositionToValue(position: number, type: 'start' | 'end'): any;
    valueToRelativePosition(value: number): number;
    onBarClick(positionStart: number, positionEnd: number, e: MouseEvent): void;
    updateStart(absolutePosition: number): void;
    updateEnd(absolutePosition: number): void;
    render(): JSX.Element;
}
