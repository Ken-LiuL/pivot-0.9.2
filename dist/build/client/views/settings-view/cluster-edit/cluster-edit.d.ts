import * as React from 'react';
import { AppSettings, Cluster } from '../../../../common/models/index';
export interface ClusterEditProps extends React.Props<any> {
    settings: AppSettings;
    clusterId?: string;
    onSave: (settings: AppSettings) => void;
}
export interface ClusterEditState {
    tempCluster?: Cluster;
    hasChanged?: boolean;
    canSave?: boolean;
    cluster?: Cluster;
    errors?: any;
}
export declare class ClusterEdit extends React.Component<ClusterEditProps, ClusterEditState> {
    constructor();
    componentWillReceiveProps(nextProps: ClusterEditProps): void;
    initFromProps(props: ClusterEditProps): void;
    cancel(): void;
    save(): void;
    goBack(): void;
    onSimpleChange(newCluster: Cluster, isValid: boolean, path: string): void;
    renderGeneral(): JSX.Element;
    render(): JSX.Element;
}
