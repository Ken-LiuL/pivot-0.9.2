import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Dimension } from '../../../common/models/index';
export interface SegmentActionButtonsProps extends React.Props<any> {
    clicker: Clicker;
    dimension?: Dimension;
    segmentLabel?: string;
    disableMoreMenu?: boolean;
    openRawDataModal?: Fn;
    onClose?: Fn;
}
export interface SegmentActionButtonsState {
    moreMenuOpenOn?: Element;
}
export declare class SegmentActionButtons extends React.Component<SegmentActionButtonsProps, SegmentActionButtonsState> {
    constructor();
    onSelect(e: MouseEvent): void;
    onCancel(e: MouseEvent): void;
    onMore(e: MouseEvent): void;
    closeMoreMenu(): void;
    getUrl(): string;
    openRawDataModal(): void;
    renderMoreMenu(): JSX.Element;
    render(): JSX.Element;
}
