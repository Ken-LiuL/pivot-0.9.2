import * as React from 'react';
export interface GoldenCenterProps extends React.Props<any> {
    topRatio?: number;
    minPadding?: number;
}
export interface GoldenCenterState {
    top?: number;
}
export declare class GoldenCenter extends React.Component<GoldenCenterProps, GoldenCenterState> {
    static defaultProps: {
        topRatio: number;
        minPadding: number;
    };
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalResizeListener(): void;
    render(): JSX.Element;
}
