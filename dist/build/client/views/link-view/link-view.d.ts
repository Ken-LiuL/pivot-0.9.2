import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Essence, Stage, LinkViewConfig, LinkItem, User, Customization } from '../../../common/models/index';
export interface LinkViewLayout {
    linkPanelWidth: number;
    pinboardWidth: number;
}
export interface LinkViewProps extends React.Props<any> {
    linkViewConfig: LinkViewConfig;
    user?: User;
    hash: string;
    updateViewHash: (newHash: string) => void;
    changeHash: (newHash: string, force?: boolean) => void;
    getUrlPrefix?: () => string;
    onNavClick?: Fn;
    customization?: Customization;
}
export interface LinkViewState {
    linkItem?: LinkItem;
    essence?: Essence;
    visualizationStage?: Stage;
    menuStage?: Stage;
    layout?: LinkViewLayout;
}
export declare class LinkView extends React.Component<LinkViewProps, LinkViewState> {
    private clicker;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: LinkViewProps): void;
    componentWillUpdate(nextProps: LinkViewProps, nextState: LinkViewState): void;
    componentWillUnmount(): void;
    globalResizeListener(): void;
    selectLinkItem(linkItem: LinkItem): void;
    goToCubeView(): void;
    getStoredLayout(): LinkViewLayout;
    storeLayout(layout: LinkViewLayout): void;
    onLinkPanelResize(value: number): void;
    onPinboardPanelResize(value: number): void;
    onPanelResizeEnd(): void;
    renderPresets(): JSX.Element;
    renderLinkPanel(style: React.CSSProperties): JSX.Element;
    render(): JSX.Element;
}
