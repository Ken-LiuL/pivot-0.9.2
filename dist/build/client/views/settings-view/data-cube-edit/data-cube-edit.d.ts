import * as React from 'react';
import { AppSettings, DataSource } from '../../../../common/models/index';
export interface DataCubeEditProps extends React.Props<any> {
    settings: AppSettings;
    cubeId?: string;
    tab?: string;
    onSave: (settings: AppSettings) => void;
}
export interface DataCubeEditState {
    tempCube?: DataSource;
    hasChanged?: boolean;
    cube?: DataSource;
    tab?: any;
    canSave?: boolean;
    errors?: any;
}
export interface Tab {
    label: string;
    value: string;
    render: () => JSX.Element;
}
export declare class DataCubeEdit extends React.Component<DataCubeEditProps, DataCubeEditState> {
    private tabs;
    constructor();
    componentWillReceiveProps(nextProps: DataCubeEditProps): void;
    initFromProps(props: DataCubeEditProps): void;
    selectTab(tab: string): void;
    renderTabs(activeTab: Tab): JSX.Element[];
    cancel(): void;
    save(): void;
    goBack(): void;
    onSimpleChange(newCube: DataSource, isValid: boolean, path: string): void;
    renderGeneral(): JSX.Element;
    renderDimensions(): JSX.Element;
    renderMeasures(): JSX.Element;
    render(): JSX.Element;
}
