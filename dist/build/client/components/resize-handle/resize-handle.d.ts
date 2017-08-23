import * as React from 'react';
export interface ResizeHandleProps extends React.Props<any> {
    side: 'left' | 'right';
    min: number;
    max: number;
    initialValue: number;
    onResize?: (newX: number) => void;
    onResizeEnd?: (newX: number) => void;
}
export interface ResizeHandleState {
    dragging?: Boolean;
    startValue?: number;
    currentValue?: number;
    anchor?: number;
}
export declare class ResizeHandle extends React.Component<ResizeHandleProps, ResizeHandleState> {
    mounted: boolean;
    private offset;
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseDown(event: MouseEvent): void;
    getValueFromX(x: number): number;
    constrainValue(value: number): number;
    onGlobalMouseMove(event: MouseEvent): void;
    onGlobalMouseUp(event: MouseEvent): void;
    render(): JSX.Element;
}
