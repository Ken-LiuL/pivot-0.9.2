import { Instance } from 'immutable-class';
export declare type Iframe = "allow" | "deny";
export interface ServerSettingsValue {
    port?: number;
    serverHost?: string;
    serverRoot?: string;
    pageMustLoadTimeout?: number;
    iframe?: Iframe;
}
export interface ServerSettingsJS {
    port?: number;
    serverHost?: string;
    serverRoot?: string;
    pageMustLoadTimeout?: number;
    iframe?: Iframe;
}
export declare class ServerSettings implements Instance<ServerSettingsValue, ServerSettingsJS> {
    static DEFAULT_PORT: number;
    static DEFAULT_SERVER_ROOT: string;
    static DEFAULT_PAGE_MUST_LOAD_TIMEOUT: number;
    static DEFAULT_IFRAME: Iframe;
    static isServerSettings(candidate: any): candidate is ServerSettings;
    static fromJS(parameters: ServerSettingsJS, configFileDir?: string): ServerSettings;
    port: number;
    serverHost: string;
    serverRoot: string;
    pageMustLoadTimeout: number;
    iframe: Iframe;
    druidRequestDecorator: string;
    constructor(parameters: ServerSettingsValue);
    valueOf(): ServerSettingsValue;
    toJS(): ServerSettingsJS;
    toJSON(): ServerSettingsJS;
    toString(): string;
    equals(other: ServerSettings): boolean;
}
