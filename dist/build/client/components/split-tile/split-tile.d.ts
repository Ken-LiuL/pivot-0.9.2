import * as React from 'react';
import * as Q from 'q';
import { Stage, Clicker, Essence, SplitCombine, Dimension, DragPosition } from '../../../common/models/index';
import { SplitMenu } from '../split-menu/split-menu';
export interface SplitTileProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    menuStage: Stage;
    getUrlPrefix?: () => string;
}
export interface SplitTileState {
    SplitMenuAsync?: typeof SplitMenu;
    menuOpenOn?: Element;
    menuDimension?: Dimension;
    menuSplit?: SplitCombine;
    dragPosition?: DragPosition;
    overflowMenuOpenOn?: Element;
    maxItems?: number;
    menuInside?: Element;
}
export declare class SplitTile extends React.Component<SplitTileProps, SplitTileState> {
    private overflowMenuId;
    private overflowMenuDeferred;
    constructor();
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SplitTileProps): void;
    componentDidUpdate(): void;
    selectDimensionSplit(dimension: Dimension, split: SplitCombine, e: MouseEvent): void;
    openMenu(dimension: Dimension, split: SplitCombine, target: Element): void;
    closeMenu(): void;
    getOverflowMenu(): Element;
    openOverflowMenu(target: Element): Q.Promise<any>;
    closeOverflowMenu(): void;
    removeSplit(split: SplitCombine, e: MouseEvent): void;
    dragStart(dimension: Dimension, split: SplitCombine, splitIndex: number, e: DragEvent): void;
    calculateDragPosition(e: DragEvent): DragPosition;
    canDrop(e: DragEvent): boolean;
    dragEnter(e: DragEvent): void;
    dragOver(e: DragEvent): void;
    dragLeave(e: DragEvent): void;
    drop(e: DragEvent): void;
    splitMenuRequest(dimension: Dimension): void;
    overflowButtonTarget(): Element;
    overflowButtonClick(): void;
    renderMenu(): JSX.Element;
    renderOverflowMenu(items: SplitCombine[]): JSX.Element;
    renderOverflow(items: SplitCombine[], itemX: number): JSX.Element;
    renderSplit(split: SplitCombine, style: React.CSSProperties, i: number): JSX.Element;
    render(): JSX.Element;
}
