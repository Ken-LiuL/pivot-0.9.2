import * as React from 'react';
import * as Q from 'q';
import { Timezone } from 'chronoshift';
import { Stage, Clicker, Essence, FilterClause, Dimension, DragPosition } from '../../../common/models/index';
import { FilterMenu } from '../filter-menu/filter-menu';
export interface ItemBlank {
    dimension: Dimension;
    source: string;
    clause?: FilterClause;
}
export interface FilterTileProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    menuStage: Stage;
    getUrlPrefix?: () => string;
}
export interface FilterTileState {
    FilterMenuAsync?: typeof FilterMenu;
    menuOpenOn?: Element;
    menuDimension?: Dimension;
    menuInside?: Element;
    overflowMenuOpenOn?: Element;
    dragPosition?: DragPosition;
    possibleDimension?: Dimension;
    possiblePosition?: DragPosition;
    maxItems?: number;
    maxWidth?: number;
}
export declare class FilterTile extends React.Component<FilterTileProps, FilterTileState> {
    private overflowMenuId;
    private dummyDeferred;
    private overflowMenuDeferred;
    constructor();
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: FilterTileProps): void;
    componentDidUpdate(): void;
    overflowButtonTarget(): Element;
    getOverflowMenu(): Element;
    clickDimension(dimension: Dimension, e: React.MouseEvent): void;
    openMenuOnDimension(dimension: Dimension): void;
    openMenu(dimension: Dimension, target: Element): void;
    closeMenu(): void;
    openOverflowMenu(target: Element): Q.Promise<any>;
    closeOverflowMenu(): void;
    removeFilter(itemBlank: ItemBlank, e: MouseEvent): void;
    dragStart(dimension: Dimension, clause: FilterClause, e: DragEvent): void;
    calculateDragPosition(e: DragEvent): DragPosition;
    canDrop(e: DragEvent): boolean;
    dragEnter(e: DragEvent): void;
    dragOver(e: DragEvent): void;
    dragLeave(e: DragEvent): void;
    drop(e: DragEvent): void;
    addDummy(dimension: Dimension, possiblePosition: DragPosition): void;
    filterMenuRequest(dimension: Dimension): void;
    overflowButtonClick(): void;
    renderMenu(): JSX.Element;
    renderOverflowMenu(overflowItemBlanks: ItemBlank[]): JSX.Element;
    renderOverflow(overflowItemBlanks: ItemBlank[], itemX: number): JSX.Element;
    renderRemoveButton(itemBlank: ItemBlank): JSX.Element;
    renderItemLabel(dimension: Dimension, clause: FilterClause, timezone: Timezone): JSX.Element;
    renderItemBlank(itemBlank: ItemBlank, style: any): JSX.Element;
    getItemBlanks(): ItemBlank[];
    render(): JSX.Element;
}
