import * as React from 'react';
export interface RangeHandleProps extends React.Props<any> {
    positionLeft: number;
    onChange: (x: number) => void;
    offset: number;
    isAny: boolean;
    isBeyondMin?: boolean;
    isBeyondMax?: boolean;
    rightBound?: number;
    leftBound?: number;
}
export interface RangeHandleState {
    anchor: number;
}
export declare class RangeHandle extends React.Component<RangeHandleProps, RangeHandleState> {
    mounted: boolean;
    constructor();
    onGlobalMouseMove(event: MouseEvent): void;
    onMouseDown(event: MouseEvent): void;
    onGlobalMouseUp(): void;
    render(): JSX.Element;
}
