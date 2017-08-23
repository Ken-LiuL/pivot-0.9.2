import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { User, Customization } from '../../../common/models/index';
export interface HomeHeaderBarProps extends React.Props<any> {
    user?: User;
    onNavClick: Fn;
    customization?: Customization;
    title?: string;
}
export interface HomeHeaderBarState {
}
export declare class HomeHeaderBar extends React.Component<HomeHeaderBarProps, HomeHeaderBarState> {
    render(): JSX.Element;
}
