import * as React from 'react';
import { Dataset, Set } from 'plywood';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Essence, Filter, FilterMode, Dimension, Colors, DragPosition } from '../../../common/models/index';
export interface StringFilterMenuProps extends React.Props<any> {
    clicker: Clicker;
    dimension: Dimension;
    essence: Essence;
    changePosition: DragPosition;
    onClose: Fn;
}
export interface StringFilterMenuState {
    loading?: boolean;
    dataset?: Dataset;
    error?: any;
    fetchQueued?: boolean;
    searchText?: string;
    selectedValues?: Set;
    colors?: Colors;
    filterMode?: FilterMode;
}
export declare class StringFilterMenu extends React.Component<StringFilterMenuProps, StringFilterMenuState> {
    mounted: boolean;
    collectTriggerSearch: Fn;
    constructor();
    fetchData(essence: Essence, dimension: Dimension): void;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: StringFilterMenuProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    constructFilter(): Filter;
    onSearchChange(text: string): void;
    onValueClick(value: any, e: MouseEvent): void;
    onOkClick(): void;
    onCancelClick(): void;
    actionEnabled(): boolean;
    onSelectFilterOption(filterMode: FilterMode): void;
    renderTable(): JSX.Element;
    render(): JSX.Element;
}
