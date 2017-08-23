import * as React from 'react';
export interface BodyPortalProps extends React.Props<any> {
    left?: number | string;
    top?: number | string;
    fullSize?: boolean;
    disablePointerEvents?: boolean;
}
export interface BodyPortalState {
}
export declare class BodyPortal extends React.Component<BodyPortalProps, BodyPortalState> {
    private _target;
    private _component;
    constructor();
    component: React.DOMComponent<any>;
    target: any;
    updateStyle(): void;
    componentDidMount(): void;
    teleport(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<BodyPortalProps>;
}
