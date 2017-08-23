import * as React from 'react';
import { Clicker, Essence, Measure } from '../../../common/models/index';
export interface MeasuresTileProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    style?: React.CSSProperties;
}
export interface MeasuresTileState {
    showSearch?: boolean;
    searchText?: string;
}
export declare class MeasuresTile extends React.Component<MeasuresTileProps, MeasuresTileState> {
    constructor();
    measureClick(measure: Measure, e: MouseEvent): void;
    toggleSearch(): void;
    onSearchChange(text: string): void;
    toggleMultiMeasure(): void;
    render(): JSX.Element;
}
