import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Stage, Clicker, Essence, Dimension } from '../../../common/models/index';
import { DimensionActionsMenu } from '../dimension-actions-menu/dimension-actions-menu';
export interface DimensionListTileProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    menuStage: Stage;
    triggerFilterMenu: Fn;
    triggerSplitMenu: Fn;
    getUrlPrefix?: () => string;
    style?: React.CSSProperties;
}
export interface DimensionListTileState {
    DimensionActionsMenuAsync?: typeof DimensionActionsMenu;
    menuOpenOn?: Element;
    menuDimension?: Dimension;
    highlightDimension?: Dimension;
    showSearch?: boolean;
    searchText?: string;
}
export declare class DimensionListTile extends React.Component<DimensionListTileProps, DimensionListTileState> {
    constructor();
    componentDidMount(): void;
    clickDimension(dimension: Dimension, e: MouseEvent): void;
    closeMenu(): void;
    dragStart(dimension: Dimension, e: DragEvent): void;
    onMouseOver(dimension: Dimension): void;
    onMouseLeave(dimension: Dimension): void;
    toggleSearch(): void;
    onSearchChange(text: string): void;
    renderMenu(): JSX.Element;
    render(): JSX.Element;
}
