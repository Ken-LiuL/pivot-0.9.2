import * as React from 'react';
import { AppSettings, Cluster } from '../../../../common/models/index';
export interface ClustersProps extends React.Props<any> {
    settings?: AppSettings;
    onSave?: (settings: AppSettings) => void;
}
export interface ClustersState {
    newSettings?: AppSettings;
    hasChanged?: boolean;
}
export declare class Clusters extends React.Component<ClustersProps, ClustersState> {
    constructor();
    componentWillReceiveProps(nextProps: ClustersProps): void;
    save(): void;
    editCluster(cluster: Cluster): void;
    render(): JSX.Element;
}
