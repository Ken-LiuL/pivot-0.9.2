import * as React from 'react';
import { Dataset } from 'plywood';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Essence, Dimension, SortOn, FilterMode, Colors, Granularity } from '../../../common/models/index';
import { TileAction } from '../searchable-tile/searchable-tile';
export interface DimensionTileProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    dimension: Dimension;
    sortOn: SortOn;
    colors?: Colors;
    onClose?: any;
    getUrlPrefix?: () => string;
}
export interface DimensionTileState {
    loading?: boolean;
    dataset?: Dataset;
    error?: any;
    fetchQueued?: boolean;
    unfolded?: boolean;
    foldable?: boolean;
    showSearch?: boolean;
    searchText?: string;
    selectedGranularity?: Granularity;
    filterMode?: FilterMode;
}
export declare class DimensionTile extends React.Component<DimensionTileProps, DimensionTileState> {
    mounted: boolean;
    collectTriggerSearch: Fn;
    constructor();
    fetchData(essence: Essence, dimension: Dimension, sortOn: SortOn, unfolded: boolean, selectedGranularity?: Granularity): void;
    updateFoldability(essence: Essence, dimension: Dimension, colors: Colors): boolean;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: DimensionTileProps): void;
    setFilterModeFromProps(props: DimensionTileProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onRowClick(value: any, e: MouseEvent): void;
    changeFilterMode(value: FilterMode): void;
    getFilterActions(): TileAction[];
    toggleFold(): void;
    onDragStart(e: DragEvent): void;
    toggleSearch(): void;
    onSearchChange(text: string): void;
    getTitleHeader(): string;
    onSelectGranularity(selectedGranularity: Granularity): void;
    getGranularityActions(): TileAction[];
    render(): JSX.Element;
}
