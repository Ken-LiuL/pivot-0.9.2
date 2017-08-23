import * as React from 'react';
import { Duration, Timezone } from 'chronoshift';
import { Dataset } from 'plywood';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Essence, DataSource, User, Customization } from '../../../common/models/index';
export interface CubeHeaderBarProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    user?: User;
    onNavClick: Fn;
    getUrlPrefix?: () => string;
    refreshMaxTime?: Fn;
    updatingMaxTime?: boolean;
    openRawDataModal?: Fn;
    customization?: Customization;
    getDownloadableDataset?: () => Dataset;
    changeTimezone?: (timezone: Timezone) => void;
    timezone?: Timezone;
}
export interface CubeHeaderBarState {
    hilukMenuOpenOn?: Element;
    autoRefreshMenuOpenOn?: Element;
    autoRefreshRate?: Duration;
    settingsMenuOpen?: Element;
    userMenuOpenOn?: Element;
    animating?: boolean;
}
export declare class CubeHeaderBar extends React.Component<CubeHeaderBarProps, CubeHeaderBarState> {
    mounted: boolean;
    private autoRefreshTimer;
    constructor();
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: CubeHeaderBarProps): void;
    componentWillUnmount(): void;
    setAutoRefreshFromDataSource(dataSource: DataSource): void;
    setAutoRefreshRate(rate: Duration): void;
    clearTimerIfExists(): void;
    onHilukMenuClick(e: MouseEvent): void;
    onHilukMenuClose(): void;
    renderHilukMenu(): JSX.Element;
    onAutoRefreshMenuClick(e: MouseEvent): void;
    onAutoRefreshMenuClose(): void;
    renderAutoRefreshMenu(): JSX.Element;
    onUserMenuClick(e: MouseEvent): void;
    onUserMenuClose(): void;
    renderUserMenu(): JSX.Element;
    onSettingsMenuClick(e: MouseEvent): void;
    onSettingsMenuClose(): void;
    renderSettingsMenu(): JSX.Element;
    render(): JSX.Element;
}
