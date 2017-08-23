import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Stage, Clicker, Essence, Dimension } from '../../../common/models/index';
export interface DimensionActionsMenuProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    direction: string;
    containerStage: Stage;
    openOn: Element;
    dimension: Dimension;
    triggerFilterMenu: (dimension: Dimension) => void;
    triggerSplitMenu: (dimension: Dimension) => void;
    onClose: Fn;
}
export interface DimensionActionsMenuState {
}
export declare class DimensionActionsMenu extends React.Component<DimensionActionsMenuProps, DimensionActionsMenuState> {
    constructor();
    onFilter(): void;
    onSplit(): void;
    onSubsplit(): void;
    onPin(): void;
    render(): JSX.Element;
}
