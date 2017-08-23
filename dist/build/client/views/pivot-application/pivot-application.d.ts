import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DataSource, AppSettings, User } from '../../../common/models/index';
import { AboutModal } from '../../components/about-modal/about-modal';
import { SideDrawer } from '../../components/side-drawer/side-drawer';
import { Notifications } from '../../components/notifications/notifications';
export interface PivotApplicationProps extends React.Props<any> {
    version: string;
    user?: User;
    maxFilters?: number;
    maxSplits?: number;
    readOnly?: boolean;
    appSettings: AppSettings;
}
export interface PivotApplicationState {
    AboutModalAsync?: typeof AboutModal;
    NotificationsAsync?: typeof Notifications;
    ReactCSSTransitionGroupAsync?: typeof ReactCSSTransitionGroup;
    SideDrawerAsync?: typeof SideDrawer;
    appSettings?: AppSettings;
    drawerOpen?: boolean;
    selectedDataSource?: DataSource;
    viewType?: ViewType;
    viewHash?: string;
    showAboutModal?: boolean;
}
export declare type ViewType = "home" | "cube" | "link" | "settings";
export declare const HOME: ViewType;
export declare const CUBE: ViewType;
export declare const LINK: ViewType;
export declare const SETTINGS: ViewType;
export declare class PivotApplication extends React.Component<PivotApplicationProps, PivotApplicationState> {
    private hashUpdating;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalHashChangeListener(): void;
    hashToState(hash: string): void;
    parseHash(hash: string): string[];
    getViewTypeFromHash(hash: string): ViewType;
    getDataSourceFromHash(dataSources: DataSource[], hash: string): DataSource;
    getViewHashFromHash(hash: string): string;
    sideDrawerOpen(drawerOpen: boolean): void;
    changeHash(hash: string, force?: boolean): void;
    updateViewHash(viewHash: string, force?: boolean): void;
    getUrlPrefix(baseOnly?: boolean): string;
    openAboutModal(): void;
    onAboutModalClose(): void;
    onSettingsChange(newSettings: AppSettings): void;
    renderAboutModal(): JSX.Element;
    renderNotifications(): JSX.Element;
    render(): JSX.Element;
}
