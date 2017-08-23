import * as React from 'react';
import { DataSource, User, Customization } from '../../../common/models/index';
import { Fn } from '../../../common/utils/general/general';
export interface HomeViewProps extends React.Props<any> {
    dataSources?: DataSource[];
    user?: User;
    onNavClick?: Fn;
    onOpenAbout: Fn;
    customization?: Customization;
}
export interface HomeViewState {
}
export declare class HomeView extends React.Component<HomeViewProps, HomeViewState> {
    render(): JSX.Element;
}
