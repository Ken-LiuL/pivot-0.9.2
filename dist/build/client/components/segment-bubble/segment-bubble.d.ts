import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Dimension } from '../../../common/models/index';
export interface SegmentBubbleProps extends React.Props<any> {
    left: number;
    top: number;
    dimension?: Dimension;
    segmentLabel?: string;
    measureLabel?: string;
    clicker?: Clicker;
    onClose?: Fn;
    openRawDataModal?: Fn;
}
export interface SegmentBubbleState {
    moreMenuOpenOn?: Element;
}
export declare class SegmentBubble extends React.Component<SegmentBubbleProps, SegmentBubbleState> {
    constructor();
    render(): JSX.Element;
}
