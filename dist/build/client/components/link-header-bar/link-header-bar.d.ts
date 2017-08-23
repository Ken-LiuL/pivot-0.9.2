import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { User, Customization } from '../../../common/models/index';
export interface LinkHeaderBarProps extends React.Props<any> {
    title: string;
    user?: User;
    onNavClick: Fn;
    onExploreClick: Fn;
    getUrlPrefix?: () => string;
    customization?: Customization;
}
export interface LinkHeaderBarState {
}
export declare class LinkHeaderBar extends React.Component<LinkHeaderBarProps, LinkHeaderBarState> {
    constructor();
    render(): JSX.Element;
}
