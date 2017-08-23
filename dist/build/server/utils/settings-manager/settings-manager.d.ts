import * as Q from 'q';
import { External, Dataset } from 'plywood';
import { AppSettings, Cluster, DataSource } from '../../../common/models/index';
import { Logger } from '../logger/logger';
import { FileManager } from '../file-manager/file-manager';
import { ClusterManager } from '../cluster-manager/cluster-manager';
export interface SettingsLocation {
    location: 'local' | 'transient';
    readOnly: boolean;
    uri?: string;
    initAppSettings?: AppSettings;
}
export interface SettingsManagerOptions {
    logger: Logger;
    verbose?: boolean;
    initialLoadTimeout?: number;
    anchorPath: string;
}
export interface GetSettingsOptions {
    dataSourceOfInterest?: string;
    timeout?: number;
}
export declare class SettingsManager {
    logger: Logger;
    verbose: boolean;
    anchorPath: string;
    settingsLocation: SettingsLocation;
    appSettings: AppSettings;
    fileManagers: FileManager[];
    clusterManagers: ClusterManager[];
    currentWork: Q.Promise<any>;
    initialLoadTimeout: number;
    constructor(settingsLocation: SettingsLocation, options: SettingsManagerOptions);
    private addClusterManager(cluster, dataSources);
    private removeClusterManager(cluster);
    private addFileManager(dataSource);
    private removeFileManager(dataSource);
    getSettings(opts?: GetSettingsOptions): Q.Promise<AppSettings>;
    reviseSettings(newSettings: AppSettings): Q.Promise<any>;
    reviseClusters(newSettings: AppSettings): Q.Promise<any>;
    reviseDataSources(newSettings: AppSettings): Q.Promise<any>;
    updateSettings(newSettings: AppSettings): Q.Promise<any>;
    generateDataSourceName(external: External): string;
    onDatasetChange(dataSourceName: string, changedDataset: Dataset): void;
    onExternalChange(cluster: Cluster, dataSourceName: string, changedExternal: External): Q.Promise<any>;
    makeMaxTimeCheckTimer(): void;
    updateDataSourceMaxTime(dataSource: DataSource): Q.Promise<any>;
}
