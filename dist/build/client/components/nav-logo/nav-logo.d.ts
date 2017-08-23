import * as React from 'react';
export interface NavLogoProps extends React.Props<any> {
    onClick?: React.MouseEventHandler;
    customLogoSvg?: string;
}
export interface NavLogoState {
}
export declare class NavLogo extends React.Component<NavLogoProps, NavLogoState> {
    constructor();
    render(): JSX.Element;
}
