import * as React from 'react';
import { Timezone } from 'chronoshift';
import { Fn } from '../../../common/utils/general/general';
import { DataSource, Dimension, Essence, Stage, User, Customization } from '../../../common/models/index';
import { RawDataModal } from '../../components/raw-data-modal/raw-data-modal';
export interface CubeViewLayout {
    dimensionPanelWidth: number;
    pinboardWidth: number;
}
export interface CubeViewProps extends React.Props<any> {
    maxFilters?: number;
    maxSplits?: number;
    user?: User;
    hash: string;
    updateViewHash: (newHash: string, force?: boolean) => void;
    getUrlPrefix?: () => string;
    dataSource: DataSource;
    onNavClick?: Fn;
    customization?: Customization;
}
export interface CubeViewState {
    essence?: Essence;
    visualizationStage?: Stage;
    menuStage?: Stage;
    dragOver?: boolean;
    showRawDataModal?: boolean;
    RawDataModalAsync?: typeof RawDataModal;
    layout?: CubeViewLayout;
    updatingMaxTime?: boolean;
}
export declare class CubeView extends React.Component<CubeViewProps, CubeViewState> {
    static defaultProps: {
        maxFilters: number;
        maxSplits: number;
    };
    mounted: boolean;
    private clicker;
    private downloadableDataset;
    constructor();
    refreshMaxTime(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: CubeViewProps): void;
    componentWillUpdate(nextProps: CubeViewProps, nextState: CubeViewState): void;
    componentWillUnmount(): void;
    getEssenceFromDataSource(dataSource: DataSource): Essence;
    getEssenceFromHash(hash: string): Essence;
    globalKeyDownListener(e: KeyboardEvent): void;
    globalResizeListener(): void;
    canDrop(e: DragEvent): boolean;
    dragEnter(e: DragEvent): void;
    dragOver(e: DragEvent): void;
    dragLeave(e: DragEvent): void;
    drop(e: DragEvent): void;
    openRawDataModal(): void;
    onRawDataModalClose(): void;
    renderRawDataModal(): JSX.Element;
    triggerFilterMenu(dimension: Dimension): void;
    triggerSplitMenu(dimension: Dimension): void;
    changeTimezone(newTimezone: Timezone): void;
    getStoredLayout(): CubeViewLayout;
    storeLayout(layout: CubeViewLayout): void;
    onDimensionPanelResize(value: number): void;
    onPinboardPanelResize(value: number): void;
    onPanelResizeEnd(): void;
    render(): JSX.Element;
}
