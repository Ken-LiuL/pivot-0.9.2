import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { DataSource, Customization } from '../../../common/models/index';
export interface SideDrawerProps extends React.Props<any> {
    selectedDataSource: DataSource;
    dataSources: DataSource[];
    onOpenAbout: Fn;
    onClose: Fn;
    customization?: Customization;
    showOverviewLink?: boolean;
}
export interface SideDrawerState {
}
export declare class SideDrawer extends React.Component<SideDrawerProps, SideDrawerState> {
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalMouseDownListener(e: MouseEvent): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    onHomeClick(): void;
    renderOverviewLink(): JSX.Element;
    render(): JSX.Element;
}
