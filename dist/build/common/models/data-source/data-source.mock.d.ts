import { DataSource, DataSourceJS } from './data-source';
export declare class DataSourceMock {
    static WIKI_JS: DataSourceJS;
    static TWITTER_JS: DataSourceJS;
    static wiki(): DataSource;
    static twitter(): DataSource;
}
