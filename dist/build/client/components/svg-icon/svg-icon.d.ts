import * as React from 'react';
export interface SvgIconProps extends React.Props<any> {
    svg: string;
    className?: string;
    style?: any;
}
export interface SvgIconState {
}
export declare class SvgIcon extends React.Component<SvgIconProps, SvgIconState> {
    constructor();
    render(): React.DOMElement<{
        className: string;
        viewBox: string;
        preserveAspectRatio: string;
        style: any;
        dangerouslySetInnerHTML: {
            __html: string;
        };
    }>;
}
