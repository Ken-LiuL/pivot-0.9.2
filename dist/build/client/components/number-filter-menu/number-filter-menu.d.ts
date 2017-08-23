import * as React from 'react';
import { Clicker, Essence, Filter, Dimension } from '../../../common/models/index';
import { Fn } from '../../../common/utils/general/general';
export interface NumberFilterMenuProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    dimension: Dimension;
    onClose: Fn;
}
export interface NumberFilterMenuState {
    leftOffset?: number;
    rightBound?: number;
    start?: number;
    startInput?: string;
    end?: number;
    endInput?: string;
    significantDigits?: number;
}
export declare class NumberFilterMenu extends React.Component<NumberFilterMenuProps, NumberFilterMenuState> {
    mounted: boolean;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    constructFilter(): Filter;
    globalKeyDownListener(e: KeyboardEvent): void;
    onOkClick(): void;
    onCancelClick(): void;
    onRangeInputStartChange(e: KeyboardEvent): void;
    onRangeInputEndChange(e: KeyboardEvent): void;
    onRangeStartChange(newStart: number): void;
    onRangeEndChange(newEnd: number): void;
    actionEnabled(): boolean;
    render(): JSX.Element;
}
