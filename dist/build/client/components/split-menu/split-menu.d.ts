import * as React from "react";
import { Fn } from "../../../common/utils/index";
import { Stage, Clicker, Essence, SplitCombine, Colors, Dimension, SortOn, Granularity, ContinuousDimensionKind } from "../../../common/models/index";
export interface SplitMenuProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    openOn: Element;
    containerStage: Stage;
    onClose: Fn;
    dimension: Dimension;
    split: SplitCombine;
    inside?: Element;
}
export interface SplitMenuState {
    split?: SplitCombine;
    colors?: Colors;
}
export declare class SplitMenu extends React.Component<SplitMenuProps, SplitMenuState> {
    mounted: boolean;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    onSelectGranularity(granularity: Granularity): void;
    onSelectSortOn(sortOn: SortOn): void;
    onToggleDirection(): void;
    onSelectLimit(limit: number): void;
    onOkClick(): void;
    onCancelClick(): void;
    getSortOn(): SortOn;
    renderGranularityPicker(type: ContinuousDimensionKind): JSX.Element;
    renderSortDropdown(): React.ReactElement<any>;
    renderSortDirection(): JSX.Element;
    renderLimitDropdown(includeNone: boolean): React.ReactElement<any>;
    renderTimeControls(): JSX.Element;
    renderNumberControls(): JSX.Element;
    renderStringControls(): JSX.Element;
    actionEnabled(): boolean;
    render(): JSX.Element;
}
