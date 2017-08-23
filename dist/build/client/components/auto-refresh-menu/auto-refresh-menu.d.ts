import * as React from 'react';
import { Duration } from 'chronoshift';
import { Fn } from '../../../common/utils/general/general';
import { DataSource } from '../../../common/models/index';
export interface AutoRefreshMenuProps extends React.Props<any> {
    openOn: Element;
    onClose: Fn;
    autoRefreshRate: Duration;
    setAutoRefreshRate: Fn;
    refreshMaxTime: Fn;
    dataSource: DataSource;
}
export interface AutoRefreshMenuState {
}
export declare class AutoRefreshMenu extends React.Component<AutoRefreshMenuProps, AutoRefreshMenuState> {
    constructor();
    onRefreshNowClick(): void;
    renderRefreshIntervalDropdown(): React.ReactElement<any>;
    render(): JSX.Element;
}
