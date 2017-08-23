import * as Q from 'q';
import { External } from 'plywood';
import { DruidRequestDecorator } from 'plywood-druid-requester';
import { Cluster } from '../../../common/models/index';
import { Logger } from '../logger/logger';
export interface RequestDecoratorFactoryParams {
    options: any;
    cluster: Cluster;
}
export interface DruidRequestDecoratorModule {
    version: number;
    druidRequestDecoratorFactory: (logger: Logger, params: RequestDecoratorFactoryParams) => DruidRequestDecorator;
}
export interface ManagedExternal {
    name: string;
    external: External;
    autoDiscovered?: boolean;
    suppressIntrospection?: boolean;
}
export interface ClusterManagerOptions {
    logger: Logger;
    verbose?: boolean;
    anchorPath: string;
    initialExternals?: ManagedExternal[];
    onExternalChange?: (name: string, external: External) => Q.Promise<any>;
    generateExternalName?: (external: External) => string;
}
export declare class ClusterManager {
    logger: Logger;
    verbose: boolean;
    anchorPath: string;
    cluster: Cluster;
    initialConnectionEstablished: boolean;
    introspectedSources: Lookup<boolean>;
    version: string;
    requester: Requester.PlywoodRequester<any>;
    managedExternals: ManagedExternal[];
    onExternalChange: (name: string, external: External) => void;
    generateExternalName: (external: External) => string;
    requestDecoratorModule: DruidRequestDecoratorModule;
    private sourceListRefreshInterval;
    private sourceListRefreshTimer;
    private sourceReintrospectInterval;
    private sourceReintrospectTimer;
    private initialConnectionTimer;
    constructor(cluster: Cluster, options: ClusterManagerOptions);
    init(): Q.Promise<any>;
    destroy(): void;
    private addManagedExternal(managedExternal);
    private updateManagedExternal(managedExternal, newExternal);
    private updateRequestDecorator();
    private updateRequester();
    private updateSourceListRefreshTimer();
    private updateSourceReintrospectTimer();
    private establishInitialConnection();
    private onConnectionEstablished();
    private internalizeVersion(version);
    private introspectManagedExternal(managedExternal);
    scanSourceList(): Q.Promise<any>;
    introspectSources(): Q.Promise<any>;
    refresh(): Q.Promise<any>;
    getExternalByName(name: string): External;
}
