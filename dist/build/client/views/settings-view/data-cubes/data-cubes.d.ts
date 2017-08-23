import * as React from 'react';
import { AppSettings, DataSource } from '../../../../common/models/index';
export interface DataCubesProps extends React.Props<any> {
    settings?: AppSettings;
    onSave?: (settings: AppSettings, message?: string) => void;
}
export interface DataCubesState {
    newSettings?: AppSettings;
    hasChanged?: boolean;
}
export declare class DataCubes extends React.Component<DataCubesProps, DataCubesState> {
    constructor();
    componentWillReceiveProps(nextProps: DataCubesProps): void;
    editCube(cube: DataSource): void;
    removeCube(cube: DataSource): void;
    createCube(): void;
    render(): JSX.Element;
}
