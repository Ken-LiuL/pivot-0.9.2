import { AppSettings, AppSettingsJS, AppSettingsContext } from './app-settings';
export declare class AppSettingsMock {
    static wikiOnlyJS(): AppSettingsJS;
    static wikiWithLinkViewJS(): AppSettingsJS;
    static wikiTwitterJS(): AppSettingsJS;
    static getContext(): AppSettingsContext;
    static wikiOnly(): AppSettings;
    static wikiOnlyWithExecutor(): AppSettings;
    static wikiTwitter(): AppSettings;
}
