import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
export interface NavLink {
    name: string;
    title: string;
    href?: string;
    newTab?: boolean;
    onClick?: Fn;
}
export interface NavListProps extends React.Props<any> {
    title?: string;
    navLinks: NavLink[];
    iconSvg?: string;
    selected?: string;
}
export interface NavListState {
}
export declare class NavList extends React.Component<NavListProps, NavListState> {
    renderIcon(iconSvg: string): any;
    renderNavList(): React.DOMElement<{
        className: string;
        key: string;
        href: string;
        target: string;
        onClick: Fn;
    }>[];
    render(): JSX.Element;
}
