import * as React from 'react';
import { Dimension } from '../../../common/models/index';
export interface MenuHeaderProps extends React.Props<any> {
    dimension: Dimension;
    onSearchClick: React.MouseEventHandler;
}
export interface MenuHeaderState {
}
export declare class MenuHeader extends React.Component<MenuHeaderProps, MenuHeaderState> {
    constructor();
    render(): JSX.Element;
}
