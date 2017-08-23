import { Instance } from 'immutable-class';
import { Executor } from 'plywood';
import { Cluster, ClusterJS } from '../cluster/cluster';
import { Customization, CustomizationJS } from '../customization/customization';
import { DataSource, DataSourceJS } from '../data-source/data-source';
import { LinkViewConfig, LinkViewConfigJS } from '../link-view-config/link-view-config';
import { Manifest } from '../manifest/manifest';
export interface AppSettingsValue {
    clusters?: Cluster[];
    customization?: Customization;
    dataSources?: DataSource[];
    linkViewConfig?: LinkViewConfig;
}
export interface AppSettingsJS {
    clusters?: ClusterJS[];
    customization?: CustomizationJS;
    dataSources?: DataSourceJS[];
    linkViewConfig?: LinkViewConfigJS;
}
export interface AppSettingsContext {
    visualizations: Manifest[];
    executorFactory?: (dataSource: DataSource) => Executor;
}
export declare class AppSettings implements Instance<AppSettingsValue, AppSettingsJS> {
    static BLANK: AppSettings;
    static isAppSettings(candidate: any): candidate is AppSettings;
    static fromJS(parameters: AppSettingsJS, context?: AppSettingsContext): AppSettings;
    clusters: Cluster[];
    customization: Customization;
    dataSources: DataSource[];
    linkViewConfig: LinkViewConfig;
    constructor(parameters: AppSettingsValue);
    valueOf(): AppSettingsValue;
    toJS(): AppSettingsJS;
    toJSON(): AppSettingsJS;
    toString(): string;
    equals(other: AppSettings): boolean;
    toClientSettings(): AppSettings;
    getDataSourcesForCluster(clusterName: string): DataSource[];
    getDataSource(dataSourceName: string): DataSource;
    addOrUpdateDataSource(dataSource: DataSource): AppSettings;
    attachExecutors(executorFactory: (dataSource: DataSource) => Executor): AppSettings;
    changeCustomization(customization: Customization): AppSettings;
    changeClusters(clusters: Cluster[]): AppSettings;
    addCluster(cluster: Cluster): AppSettings;
    changeDataSources(dataSources: DataSource[]): AppSettings;
    addDataSource(dataSource: DataSource): AppSettings;
}
