import * as React from 'react';
import { DragPosition } from '../../../common/models/index';
export interface FancyDragIndicatorProps extends React.Props<any> {
    dragPosition: DragPosition;
}
export interface FancyDragIndicatorState {
}
export declare class FancyDragIndicator extends React.Component<FancyDragIndicatorProps, FancyDragIndicatorState> {
    constructor();
    render(): JSX.Element;
}
