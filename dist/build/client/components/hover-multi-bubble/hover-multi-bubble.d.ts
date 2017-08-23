import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Dimension } from '../../../common/models/index';
export interface ColorEntry {
    color: string;
    segmentLabel: string;
    measureLabel: string;
}
export interface HoverMultiBubbleProps extends React.Props<any> {
    left: number;
    top: number;
    dimension?: Dimension;
    segmentLabel?: string;
    colorEntries?: ColorEntry[];
    clicker?: Clicker;
    onClose?: Fn;
}
export interface HoverMultiBubbleState {
}
export declare class HoverMultiBubble extends React.Component<HoverMultiBubbleProps, HoverMultiBubbleState> {
    mounted: boolean;
    constructor();
    renderColorSwabs(): JSX.Element;
    render(): JSX.Element;
}
